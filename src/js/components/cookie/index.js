import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';
import { onSlotChange } from './events.js';
import Cookies from 'Classes/cookies/cookies.js';

template.render();

/**
 * Cursors element
 * 
 * @class
 * @extends	BaseElement
 */
export default class CookieElement extends BaseElement {

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
		
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(template.clone());
		shadow.addEventListener('slotchange', onSlotChange.bind(this));
	}

	/**
	 * Gets the name attribute value.
	 * @property
	 */
	get name() {
		return this.getAttribute('name');
	}

    /**
	 * Gets and sets the open attribute.
	 * @property
	 */
	get open() {
		const value = this.getAttribute('open')
		return value !== null;
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
					this.setAttribute('aria-hidden', 'false');
				} else {
					this.setAttribute('aria-hidden', 'true');
					this.close();
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

		if (this.hasAttribute('aria-hidden') === false) {
			this.setAttribute('aria-hidden', 'true');
		}

		if (this.hasAttribute('aria-label') === false) {
			this.setAttribute('aria-label', 'Cookie Consensus');
		}

		if (this.hasAttribute('role') === false) {
			this.setAttribute('role', 'dialog');
		}

		const cookie = Cookies.get(this.name);
		if (cookie === null) {
			this.open = true;
		} else {
			this.remove();
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

	async getCookieScripts() {
		try {
			const response = await fetch(`${wp.rest}kss/v1/cookies`);
			const scripts = await response.json();
			return scripts;
		} catch(error) {
			return error;
		}
	}

	/**
	 * Closes and removes the element.
	 * 
	 * @method	close
	 * @returns	{void}
	 */
	close() {
		this.addEventListener('transitionend', event => {
			this.remove();
		});
	}

}