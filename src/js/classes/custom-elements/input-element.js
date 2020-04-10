/**
 * @module	./classes/custom-elements/input-element
 */

import BaseElement from './base-element.js';

/**
 * 
 * @class
 * @extends	BaseElement
 */
export default class CustomInputElement extends BaseElement {

	/** 
	 * @private
	 */
  	#internals = null;
  
	/** 
	 * @private
	 */
	#value = '';

	/**
	 * @static
	 */
	static formAssociated = true;

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.#internals = this.attachInternals();
	}
	
	/**
	 * Gets and set the value property.
	 */
	get value() { 
		return this.#value 
	}

	set value(value) { 
		this.#value = value 
	}

	/**
	 * Gets the form element from internals.
	 * @property
	 */
	get form() { 
		return this.#internals.form; 
	}

	/**
	 * Gets the validity value from internals.
	 * @property
	 */
	get validity() { 
		return this.#internals.validity; 
	}

	/**
	 * Gets the validation message from internals.
	 * @property
	 */
	get validationMessage() { 
		return this.#internals.validationMessage; 
	}

	/**
	 * Gets the will validate boolean from internals.
	 * @property
	 */
	get willValidate() { 
		return this.#internals.willValidate; 
	}

	/**
	 * Called when the browser associates the element with a form element, 
	 * or disassociates the element from a form element.
	 * 
	 * @method	formAssociatedCallback
	 * @returns	{void}
	 */
	formAssociatedCallback() {

	}

	/**
	 * Called after the disabled state of the element changes, 
	 * either because the disabled attribute of this element was added or removed; 
	 * or because the disabled state changed on a <fieldset> that's an ancestor of this element.
	 * The disabled parameter represents the new disabled state of the element. 
	 * The element may, for example, disable elements in its shadow DOM when it is disabled. 
	 * 
	 * @method	formDisabledCallback
	 * @returns	{void}
	 */
	formDisabledCallback(disabled) {

	}

	/**
	 * Called after the form is reset. The element should reset itself to some kind of default state. 
	 * For native inputs, this usually involves setting the value property to match the value attribute 
	 * set in markup (or in the case of a checkbox, setting the checked property to match the checked attribute.
	 * 
	 * @method	formResetCallback
	 * @returns	{void}
	 */
	formResetCallback() {

	}

	/**
	 * Called in one of two circumstances:
	 * 
	 * When the browser restores the state of the element (for example, after a navigation, or when the browser restarts). 
	 * The mode argument is "restore" in this case.
	 * 
	 * When the browser's input-assist features such as form autofilling sets a value. The mode argument is "autocomplete" in this case.
	 * 
	 * @method	formStateRestoreCallback
	 * @returns	{void}
	 */
	formStateRestoreCallback(state, mode) {

	}
	
	/**
	 * Checks the validity of the form element.
	 * 
	 * @method	checkValidity
	 * @returns	{boolean}
	 */
	checkValidity() { 
		return this.#internals.checkValidity(); 
	}

	/**
	 * Reports the validity of the form element.
	 * 
	 * @method	reportValidity
	 * @returns	{}
	 */
	reportValidity() { 
		return this.#internals.reportValidity(); 
	}

}