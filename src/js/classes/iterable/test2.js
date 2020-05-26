class Wait {

	constructor(duration = 0) {
		const value = Number(duration);
		if (!Number.isNaN(value)) {
			this.duration = value;
		}
	}

	execute() {
		return new Promise(resolve => {
			setTimeout(resolve, this.duration);
		});
	}

}

class Action {

	constructor(callback) {
		if ('function' === typeof callback) {
			this.callback = callback;
		} else {
			throw new TypeError('callback is not type of function');
		}
	}

	execute(...args) {
		return new Promise(async resolve => {
			const result = await this.callback(resolve, ...args);
			return result;
		});
	}

}

class Queue {

	constructor(options) {
    	this.instructions = [];
	}

	pushToQueue(value) {
		this.instructions.push(value);
	}

	action(callback) {
		this.pushToQueue(new Action(callback));
		return this;
	}
  
  wait(duration) {
		this.pushToQueue(new Wait(duration));
		return this;
	}
  
  async *values() {
		for (const instruction of this.instructions) {
			yield instruction.execute(null);
		}
	}

	[Symbol.asyncIterator]() {
		return this.values();
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
			done('Action 2 done');
		}, 2000);
	});

console.log('test');

(async () => {
  console.log('running');
  for await (const instruction of queue) {
    console.log(instruction);
  }
})();