/**
 * @module		./classes/event/event-collection.js
 */

import EventEntry from './event-entry.js';

/**
 * Collection of event listener parameters to add or remove multiple listeners. 
 * This can be used in classes or custom elements where the binding is important.
 * 
 * @class
 */
export default class EventCollection {

	/**
	 * @private
	 */
	#entries = [];

	/**
	 * Returns an iterable object with the entry values.
	 * @returns	{Iterable}
	 */
	*entries() {
		for (const entry of this.#entries) {
			yield entry;
		}
	}

	/**
	 * Returns an iterable object with target values.
	 * @returns	{Iterable}
	 */
	*targets() {
		for (const { target } of this.#entries) {
			yield target;
		}
	}

	/**
	 * Returns an iterable object with type values.
	 * @returns	{Iterable}
	 */
	*types() {
		for (const { type } of this.#entries) {
			yield type;
		}
	}

	/**
	 * Returns an iterable object with listener values.
	 * @returns	{Iterable}
	 */
	*listeners() {
		for (const { listener } of this.#entries) {
			yield listener;
		}
	}

	/**
	 * Returns an iterable object with option values.
	 * @returns	{Iterable}
	 */
	*options() {
		for (const { options } of this.#entries) {
			yield options;
		}
	}

	/**
	 * Iterator protocol to use for...of loops on the instance.
	 * Defaults to the entries generator.
	 * 
	 * @returns {GeneratorFunction}
	 */
	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Set a event listener with a target, type, listener and optional options.
	 * The arguments will be added to the entries array which can later be used to add or remove event listeners.
	 * 
	 * @param	{HTMLElement}
	 * @param 	{string} type 
	 * @param 	{function} listener 
	 * @param 	{(object|boolean)} options 
	 * @returns	{this} Returns the instance for method chaining.
	 */
	set(target, type, listener, options = false) {
		if (target === null) return this;
		const entry = new EventEntry(target, type, listener, options);
		this.#entries.push(entry);
		return this;
	}

	/**
	 * Splices all the EventEntrys from the entries array that
	 * match the value criteria.
	 * 
	 * @param 	{(string|function|Object|boolean)} value 
	 * @returns	{this} Returns the instance for method chaining.
	 */
	unsetAllOf(value) {
		let iterable = null;
		let key = null;
		if (value instanceof EventTarget) {
			iterable = this.targets();
			key = 'targets';
		} else if ('string' === typeof value) {
			iterable = this.types();
			key = 'types';
		} else if ('function' === typeof value) {
			iterable = this.listener();
			key = 'function';
		} else if (('object' === typeof value && value instanceof Object) || 'boolean' === typeof value) {
			iterable = this.options();
			key = 'object';
		} else {
			this.remove();
			return this;
		}
		this.#entries = this.#entries.filter(entry => {
			if (entry[key] === value) {
				entry.remove();
				return false;
			}
			return true;
		})
		return this;
	}

	/**
	 * Adds all the event listeners specified in the entries array.
	 * Returns the instance.
	 * 
	 * @param	{(undefined|EventEntry[])}
	 * @returns	{this}
	 */
	add() {
		for (const entry of this.entries()) {
			entry.add();
		}
		return this;
	}

	/**
	 * Removes all the event listeners specified in the entries array.
	 * Returns the instance.
	 * 
	 * @param	{(undefined|EventEntry[])} index
	 * @returns	{this} 
	 * 	 */
	remove(entriesArray) {
		if (Array.isArray(entriesArray)) {
			const filtered = this.#entries.filter(entry => entriesArray.some(entryofArray => entryofArray === entry))
				.forEach(entry => entry.remove());
			const remained = this.#entries.filter(entry => entriesArray.every(entryofArray => entryofArray !== entry));
			this.#entries = remained;
		} else if ('undefined' === typeof index) {
			this.#entries.forEach(entry => entry.remove());
			this.#entries.length = 0;
		}
		return this;
	}

	/**
	 * @param	{string} eventType Event type to find.
	 * @returns	{EventEntry[]} An array of objects. 
	 */
	getEntriesByTarget(eventTarget) {
		return this.#entries.filter(({ target }) => target === eventTarget);
	}

	/**
	 * @param	{string} eventType Event type to find.
	 * @returns	{EventEntry[]} An array of objects. 
	 */
	getEntriesByType(eventType) {
		return this.#entries.filter(({ type }) => type === eventType);
	}

	/**
	 * @param 	{Function} eventListener 
	 * @returns	{EventEntry[]} An array of objects. 
	 */
	getEntriesByListener(eventListener) {
		return this.#entries.filter(({ listener }) => listener === eventListener);
	}

}