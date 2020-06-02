import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';

template.render();

/**
 * Input element
 * 
 * @class
 * @extends	BaseElement
 */
export default class MessageElement extends BaseElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return ['focus'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();
		
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(template.clone());
		shadow.addEventListener('slotchange', onSlotChange.bind(this));
	}

    /**
	 * Gets and sets the focus attribute.
	 * @property
	 */
	get focus() {
		const value = this.getAttribute('focus')
		return value !== null;
	}

	set focus(value) {
		if (value === true) {
			this.setAttribute('focus', '');
		} else {
			this.removeAttribute('focus');
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
            case 'focus':
                if (newValue === '') {
                    const focussedEvent = new Event('focus');
                    this.dispatchEvent(focussedEvent);
                } else {
                    const blurredEvent = new Event('blur');
                    this.dispatchEvent(blurredEvent);
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