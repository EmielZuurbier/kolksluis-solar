export default class WaitForEvent {

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

	execute(...args) {
		return new Promise(async resolve => {
			this.target.addEventListener(this.event, (event) => {
				this.handler(resolve, event, ...args);
			})
		});
	}

}
