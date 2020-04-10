/**
 * @module      ./classes/custom-elements/custom-elements-definer
 */

export class CustomElementEntry {

	/**
	 * @private
	 */
	#name = null;

	/**
	 * @private
	 */
	#object = null;

	/**
	 * @private
	 */
	#options = null;

	/**
	 * 
	 * @param {string} name 
	 * @param {object} object 
	 * @param {object} options 
	 */
	constructor(name, object, options, prefix) {
		this.#name = name;
		this.#object = object;
		this.#options = options;
		this.prefix = prefix;
	}

	/**
	 * Gets the name property;
	 * @property
	 */
	get name() {
		return this.#name;
	}

	/**
	 * Gets the object property;
	 * @property
	 */
	get object() {
		return this.#object;
	}

	/**
	 * Gets the options property;
	 * @property
	 */
	get options() {
		return this.#options;
	}

	/**
	 * Define the current entry with the customElements.define method.
	 * 
	 * @method 	define
	 * @param	{string} prefix
	 * @returns	{Promise<string>} A promise with the name on resolve.
	 */
	define(prefix = '') {
		const name = prefix !== '' ? `${prefix}-${this.name}` : this.name;
		customElements.define(name, this.object, this.options);
		return customElements.whenDefined(name).then(() => name);
	}

}

/**
 * Class to create a list. This list will hold all the custom elements
 * that have to be defined using the customElements.define() method.
 * 
 * @class
 */
export default class CustomElementsDefiner {

	/**
	 * The custom element items.
	 * @private
	 */
	#items = [];

	/**
	 * The prefix.
	 * @private
	 */
	#prefix = '';

	/**
	 * Returns iterable object of all values of the nodes.
	 * 
	 * @yields {any} The value of the current node.
	 */
	*entries() {
		for (const item of this.#items) {
			yield item;
		}
	}

	/**
	 * Iterator protocol to use for...of loops on the instance.
	 * 
	 * @returns {GeneratorFunction}
	 */
	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Creates a new list and makes the instance of the class immutable.
     * 
     * @constructor
	 */
	constructor(prefix = 'kss') {
		if ('string' !== typeof prefix) {
			throw new Error('prefix argument is not a string');
		}
		this.#prefix = prefix;
		if (new.target === CustomElementsDefiner) {
			Object.freeze(this);
		}
	}

	/**
	 * Gets the prefix property.
	 * @property
	 */
	get prefix() {
		return this.#prefix;
	}

	/**
	 * Adds an item with a name, the element class and an optional options object.
	 * 
	 * @method	add
	 * @param 	{String} name 
	 * @param 	{HTMLElement} object 
	 * @param 	{Object} options 
	 */
	add(name, object, options = {}) {
		const entry = new CustomElementEntry(name, object, options, this.prefix);
		this.#items.push(entry);
		return this;
	}

	/**
	 * Gets the selected object from the list if it is there.
	 * 
	 * @method	get
	 * @param 	{String} name The name of the element to get.
	 * @returns	{Object}
	 */
	get(name) {
		const index = this.getIndexOf(name);
		if (index > -1) {
			return this.#items[index];
		}
	}

	/**
	 * Retrieves the index of the element in the list.
	 * 
	 * @method	getIndexOf
	 * @param 	{String} name The name of the element to get the index of.
	 * @returns	{Number}
	 */
	getIndexOf(name) {
		return this.#items.findIndex((item) => item.name === name);
	}

	/**
	 * Removes an item from the list.
	 * 
	 * @method	remove
	 * @param 	{String} name The name of the element to remove from the list.
	 * @returns	{Object[]} The removed element object.
	 */
	remove(name) {
		const index = this.getIndexOf(name);
		if (index > -1) {
			return this.#items.splice(index, 1);
		}
	}

	/**
	 * Clears out the list property.
	 * 
	 * @method	clear
	 * @returns	{this} The instance.
	 */
	clear() {
		this.#items.length = 0;
		return this;
	}

	/**
	 * Defines all the items in the list.
	 * 
	 * @method	define
	 * @returns	{Promise<String>} A promise with an message string.
	 */
	defineAll() {
		let defined = [];
		for (const entry of this.entries()) {
			let promise = entry.define(this.prefix);
			defined.push(promise);
		}
		return Promise.all(defined);
	}

}