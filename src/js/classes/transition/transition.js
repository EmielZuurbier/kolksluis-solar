export default class Transition {

	/**
	 * @private
	 */
	#step = 0.01;

	/**
	 * @private
	 */
	#timingFunction = value => value;

	/**
	 * @private
	 */
	#roundTwoDecimals = (value, step) => {
		return Math.round(((value + step) + Number.EPSILON) * 100) / 100;
	}

	/**
	 * 
	 * @param {function} timingFunction 
	 */
	constructor(timingFunction) {
		this.timingFunction = timingFunction;
	}

	/**
	 * Gets and sets the timingFunction property;
	 * @property
	 */
	get timingFunction() {
		return this.#timingFunction;
	}

	set timingFunction(value) {
		if ('function' === typeof value) {
			this.#timingFunction = value;
		}
	}

	/**
	 * Gets and sets the step property;
	 * @property
	 */
	get step() {
		return this.#step;
	}

	set step(value) {
		const numberValue = Number(value);
		if (!Number.isNaN(numberValue)) {
			this.#step = numberValue;
		}
	}

	/**
	 * @method in
	 * @param {function} callback 
	 * @returns {Promise<number>}
	 */
	in(duration, callback) {
		let value = 0;
		const speed = duration * this.step;
		return new Promise(resolve => {
			let interval = setInterval(() => {
				callback(value);
				const rounded = this.#roundTwoDecimals(value, this.step);
				value = this.#timingFunction(rounded);
				if (value >= 1) {
					callback(1);
					clearInterval(interval);
					resolve(this);
				}
			}, speed);
		});
	}

	/**
	 * @method in
	 * @param {function} callback 
	 * @returns {Promise<number>}
	 */
	out(duration, callback) {
		let value = 1;
		const speed = duration * this.step;
		return new Promise(resolve => {
			let interval = setInterval(() => {
				callback(value);
				const rounded = this.#roundTwoDecimals(value, -this.step);
				value = this.#timingFunction(rounded);
				if (value <= 0) {
					callback(0);
					clearInterval(interval);
					resolve(this);
				}
			}, speed);
		});
	}

}