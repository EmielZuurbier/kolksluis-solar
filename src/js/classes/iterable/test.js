class Action {

	#callback = null;

	constructor(callback) {
		if ('function' === typeof callback) {
			this.#callback = callback;
		} else {
			throw new TypeError('callback is not type of function');
		}
	}

	get callback() {
		return this.#callback;
	}

	execute(...args) {
		return new Promise(async resolve => {
			const result = await this.callback(resolve, ...args);
			return result;
		});
	}

}

class RepeatAction {

	#amount = null;

	#callback = null;

	#createIteration = (iteration) => new Promise(async resolve => {
		const result = await this.callback(resolve, iteration);
		return result;
	});

	constructor(amount, callback) {
		const value = Number(amount);
		if (!Number.isNaN(value)) {
			this.#amount = amount;
		} else {
			throw new TypeError('amount is not type of number');
		}
		if ('function' === typeof callback) {
			this.#callback = callback;
		} else {
			throw new TypeError('callback is not type of function');
		}
	}

	get amount() {
		return this.#amount;
	}

	get callback() {
		return this.#callback;
	}

	async execute() {
		let result;
		for (let i = 0; i < this.amount; i++) {
			result = await this.#createIteration(i)
		}
		return result;
	}

}

class WaitForEvent {

	#target = null;

	#event = null;

	#handler = null;

	constructor(target, event, handler) {
		if (target instanceof EventTarget) {
			this.#target = target;
		} else {
			throw new TypeError('target is not an instance of EventTarget');
		}
		if ('string' === typeof event) {
			this.#event = event;
		} else {
			throw new TypeError('event is not type of string');
		}
		if ('function' === typeof handler) {
			this.#handler = handler;
		} else {
			throw new TypeError('handler is not type of function');
		}
	}

	get target() {
		return this.#target;
	}

	get event() {
		return this.#event;
	}

	get handler() {
		return this.#handler;
	}

	execute() {
		return new Promise(async resolve => {
			this.target.addEventListener(this.event, (event) => {
				this.handler(resolve, event);
			})
		});
	}

}

class Wait {

	#duration = null;

	constructor(duration = 0) {
		const value = Number(duration);
		if (!Number.isNaN(value)) {
			this.#duration = value;
		}
	}

	get duration() {
		return this.#duration;
	}

	execute(...args) {
		return new Promise(resolve => {
			setTimeout(resolve, this.duration, ...args);
		});
	}

}


class Queue {

	#arguments = null;

	#instructions = [];

	#pushToQueue = (value) => {
		this.#instructions.push(value);
	}

	async *values() {
		let values = this.arguments;
		for (const instruction of this.instructions) {
			values = instruction.execute(...values);
			yield values;
		}
	}

	[Symbol.asyncIterator]() {
		return this.values();
	}

	constructor(...args) {
		this.#arguments = args;
	}

	get arguments() {
		return this.#arguments;
	}

	get instructions() {
		return this.#instructions;
	}

	get steps() {
		return this.#instructions.length;
	}

	action(callback) {
		this.#pushToQueue(new Action(callback));
		return this;
	}

	repeatAction(amount, callback) {
		this.#pushToQueue(new RepeatAction(amount, callback));
		return this;
	}

	waitForEvent(target, event, handler) {
		this.#pushToQueue(new WaitForEvent(target, event, handler));
		return this;
	}

	wait(duration) {
		this.#pushToQueue(new Wait(duration));
		return this;
	}

}

const queue = new Queue()
	.action(done => {
		setTimeout(() => {
			done('Action 1 done', 'You have waited for 3 seconds');
		}, 2000);
	})
  	.wait(3000)
	.action(done => {
		setTimeout(() => {
			done('Action 2 done, waiting for click');
		}, 2000);
	})
  .waitForEvent(window, 'click', (done, event) => {
    done('You have clicked, now starting loop');
  })
  .repeatAction(3, (done, iteration) => {
		setTimeout(() => {
      console.log(`Looping ${iteration}`);
			done('Action 3 done');
		}, 2000);
	})

console.log(queue.instructions);

(async () => {
  console.log('running');
  for await (const instruction of queue) {
    console.log(instruction);
  }
})();