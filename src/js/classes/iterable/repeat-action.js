export default class RepeatAction {

	#amount = null;

	#callback = null;

	#createIteration = (iteration, ...args) => new Promise(async resolve => {
		const result = await this.callback(resolve, iteration, ...args);
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

	async execute(...args) {
		let result;
		for (let i = 0; i < this.amount; i++) {
			result = await this.#createIteration(i, ...args)
		}
		return result;
	}

}