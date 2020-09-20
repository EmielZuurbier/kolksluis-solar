import BaseElement from 'Classes/custom-elements/base-element.js';
import { onSlotChange, onMessageClick, onMessageKeyUp } from './events.js';
import { template } from './template.js';
import { acceptedTypes } from './config.js';

template.render();

/**
 * Input element
 * 
 * @class
 * @extends	BaseElement
 */
export default class MessageElement extends BaseElement {

	/**
	 * @private
	 */
	#timeout = null;

	/**
	 * @private
	 */
	#init = () => {

		// Activate the message.
		this.activate();
		
		// If it has a delay set a timeout to deactivate.
		if (this.delay) {
			this.timeout = setTimeout(() => {
				this.deactivate();
			}, this.delay);
		}

		// Set default tabindex if not set.
		if (this.getAttribute('tabindex') !== '-1') {
			this.setAttribute('tabindex', '0');
		}

		// Set default role if not set.
		if (this.getAttribute('role') === null) {
			this.setAttribute('role', 'dialog');
		}

		// Set default aria modal attribute if not set.
		if (this.getAttribute('aria-modal') === null) {
			this.setAttribute('aria-modal', 'true');
		}

		// Set default type if not set.
		if (this.type === null) {
			this.type = 'success';
		}

		// Add event listeners.
		this.events.add();
	}

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return ['active'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();
		
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(template.clone());
		shadow.addEventListener('slotchange', onSlotChange.bind(this));
		this.events.set(this, 'click', onMessageClick.bind(this));
		this.events.set(document, 'keyup', onMessageKeyUp.bind(this));
	}

	/**
	 * Gets and sets the timeout property.
	 * @property
	 */
	get timeout() {
		return this.#timeout;
	}

	set timeout(value) {
		this.#timeout = value;
	}

	/**
	 * Gets and sets the delay attribute.
	 * @property
	 */
	get delay() {
		return Number(this.getAttribute('delay'));
	}

	set delay(value) {
		const numberValue = Number(value);
		if (Number.isNaN(numberValue)) {
			this.setAttribute('delay', numberValue);
		}
	}

	/**
	 * Gets and sets the active attribute.
	 * @property
	 */
	get active() {
		return Boolean(this.getAttribute('active'));
	}

	set active(value) {
		const boolValue = Boolean(value);
		if (boolValue) {
			this.setAttribute('active', '');
		} else {
			this.removeAttribute('active');
		}
	}

	/**
	 * Gets and set the type attribute.
	 */
	get type() {
		return this.getAttribute('type');
	}

	set type(value) {
		if (typeof value === 'string' && acceptedTypes.includes(value)) {
			this.setAttribute('type', value);
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
			case 'active':
				if (oldValue === '' && newValue === null) {
					setTimeout(() => {
						this.remove();
					}, 350);
				}
		}
    }

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {
		this.#init();
	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {
		this.events.remove();
	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {
		this.#init();
	}

	activate = () => {
		this.active = true;
	}

	deactivate = () => {
		this.active = false;
	}

}