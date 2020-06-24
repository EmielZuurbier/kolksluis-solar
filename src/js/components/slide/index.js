import BaseElement from 'Classes/custom-elements/base-element.js';

/**
 * Slide element.
 * 
 * @class
 * @extends	BaseElement
 */
export default class SlideElement extends BaseElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['active'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Set attributes
		this.setAttribute('role', 'group');
		this.setAttribute('aria-roledescription', 'slide');
	}

	/**
	 * Gets and sets the active attribute.
	 * @property
	 */
	get active() {
		const value = this.getAttribute('active');
		if (value !== null) {
			return true;
		}
		return false;
	}

	set active(value) {
		if (value === true) {
			this.setAttribute('active', '');
		} else {
			this.removeAttribute('active');
		}
	}

	/**
	 * Gets and sets the index attribute.
	 * @property
	 */
	get index() {
		return parseInt(this.getAttribute('index'));
	}

	set index(value) {
		if (!isNaN(value)) {
			this.setAttribute('index', value);
		} 
	}

	/**
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{String} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

		// Change the aria attribute
		if (attrName === 'active') {
			let detail;
			if (newValue === '') {
				detail = { detail: false };
				this.setAttribute('aria-hidden', false);
			} else {
				detail = { detail: true };
				this.setAttribute('aria-hidden', true);
			}
			const activeChangeEvent = new CustomEvent('activechange', detail);
			this.dispatchEvent(activeChangeEvent);
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		if (!this.hasAttribute('aria-hidden')) {
			this.setAttribute('aria-hidden', true);
		}

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