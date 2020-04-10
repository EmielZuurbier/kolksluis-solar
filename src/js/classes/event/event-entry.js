/**
 * @module		./classes/event/event-entry.js
 */

/**
 * EventEntry object constructor.
 * 
 * @class
 */
export default class EventEntry {

	/**
	 * @private
	 */
	#target = null;

	/**
	 * @private
	 */
	#type = null;

	/**
	 * @private
	 */
	#listener = null;

	/**
	 * @private
	 */
	#options = false;

	/**
	 * Set a event listener with a target, type, listener and optional options.
	 * 
	 * @constructor
	 * @param 	{(EventTarget|HTMLElement)} target 
	 * @param 	{string} type 
	 * @param 	{Function} listener 
	 * @param 	{(Object|boolean)} options 
	 */
	constructor(target, type, listener, options = false) {

		// If target is not a suitable candidate for an event listener.
		if (!(target instanceof EventTarget)) {
			throw new TypeError('target is not an instance of EventTarget');
		}
		this.#target = target;
		
		// Type must be a string.
		if ('string' !== typeof type) {
			throw new TypeError('type is not a string');
		}
		this.#type = type;
		
		// Listener must be a function.
		if ('function' !== typeof listener) {
			throw new TypeError('listener is not a function');
		}
		this.#listener = listener;

		if ('object' !== typeof options && 'boolean' !== typeof options) {
			throw new TypeError('options is neither a boolean or an object');
		}
		this.#options = options;

	}

	/**
	 * Gets the target property.
	 */
	get target() {
		return this.#target;
	}

	/**
	 * Gets the type property.
	 */
	get type() {
		return this.#type;
	}

	/**
	 * Gets the listener property.
	 */
	get listener() {
		return this.#listener;
	}

	/**
	 * Gets the options property.
	 */
	get options() {
		return this.#options;
	}

	/**
	 * @returns	{this}
	 */
	add() {
		this.target.addEventListener(this.type, this.listener, this.options);
		return this;
	}

	/**
	 * @returns	{this}
	 */	
	remove() {
		this.target.removeEventListener(this.type, this.listener, this.options);
		return this;
	}

}