export default class Action {

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