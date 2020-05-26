export default class Wait {

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
			setTimeout(resolve, this.duration, args);
		});
	}

}