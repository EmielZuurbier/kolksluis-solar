import EventCollection from 'Classes/event/event-collection.js';

/**
 * 
 * @class
 * @extends	HTMLElement
 */
export default class BaseElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return [];
	}

	/**
	 * @constructor
	 */
	constructor() {
        super();
        this.events = new EventCollection();
	}

	/**
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{string} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

}