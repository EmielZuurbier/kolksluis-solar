import Action from './action.js';
import RepeatAction from './repeat-action.js';
import Wait from './wait.js';
import WaitForEvent from './wait-for-event.js';

export default class Queue {

	/**
	 * @private
	 */
	#arguments = null;

	/**
	 * @private
	 */
	#instructions = [];

	/**
	 * @private
	 */
	#pushToQueue = (value) => {
		this.#instructions.push(value);
	}

	/**
	 * @async
	 * @generator
	 */
	async *values() {
		let results = null;
		for (const instruction of this.instructions) {
			results = instruction.execute(...this.arguments);
			yield results;
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