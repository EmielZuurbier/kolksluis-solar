import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';
import { onSlotChange } from './events.js';

template.render();

/**
 * Input element
 * 
 * @class
 * @extends	BaseElement
 */
export default class InputElement extends BaseElement {

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
	 * Gets the assigned elements in the label slot.
	 * @property
	 */
	get labels() {
		const slot = this.shadowRoot.querySelector('slot[name="label"]');
		const labels = slot.assignedElements();
		return labels;
	}
	
	/**
	 * Gets the assigned elements in the input slot.
	 * @property
	 */
	get inputs() {
		const slot = this.shadowRoot.querySelector('slot[name="input"]');
		const inputs = slot.assignedElements();
		return inputs;
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

}