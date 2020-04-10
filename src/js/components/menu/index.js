import BaseElement from 'Classes/custom-elements/base-element.js';
import { onClick } from './events.js';

/**
 * Menu element
 * 
 * @class
 * @extends	BaseElement
 */
export default class MenuElement extends BaseElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return ['open'];
	}

	/**
	 * @constructor
	 */
	constructor() {
        super();
		
		// Create a list of all events and their listeners.
		this.events.set(this, 'click', onClick.bind(this));

    }

    /**
	 * Gets and sets the open attribute.
	 * @property
	 */
	get open() {
		return this.getAttribute('open');
	}

	set open(value) {
		if (value === true) {
			this.setAttribute('open', '');
		} else {
			this.removeAttribute('open');
		}
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

        switch(attrName) {
            case 'open':
                if (newValue === '') {
                    const openEvent = new Event('open');
                    this.dispatchEvent(openEvent);
                } else {
                    const closeEvent = new Event('close');
                    this.dispatchEvent(closeEvent);
                }
                break;
        }

    }

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

        // Add all event listeners.
        this.events.add();

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

        // Remove all event listeners.
        this.events.remove();

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

        // Remove and add event listeners.
        this.events.add();

	}

	/**
	 * Toggle open state.
	 * 
	 * @method	toggle
	 * @returns	{boolean} The new open state.
	 */
	toggle() {
		let state = this.open === null ? true : false;
		this.open = state;
		return state;
	}

}