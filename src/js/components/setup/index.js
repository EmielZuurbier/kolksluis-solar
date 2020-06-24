import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';
import { 
	onSlotChange,
	onClick
} from './events.js';

template.render();

/**
 * Cursors element
 * 
 * @class
 * @extends	BaseElement
 */
export default class SetupElement extends BaseElement {

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

		this.map = new Map();
		this.events.set(this, 'click', onClick.bind(this));
	}

	/**
	 * Get and set the active attribute value.
	 * @property
	 */
	get active() {
		return this.getAttribute('active');
	}

	set active(value) {
		if ('string' === typeof value) {
			this.setAttribute('active', value);
		} else {
			this.setAttribute('active', '');
		}
	}

	/**
	 * Get the assigned panel elements.
	 * @property
	 */
	get panels() {
		const slot = this.shadowRoot.querySelector('slot[name="panel"]');
		return slot.assignedElements();
	}

	/**
	 * Get the assigned tab elements.
	 * @property
	 */
	get tabs() {
		const slot = this.shadowRoot.querySelector('slot[name="tab"]');
		return slot.assignedElements();
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
				if (this.active !== '') {
					for (const panel of this.panels) {
						if (panel.id === newValue) {
							panel.classList.add('is-active');
						} else {
							panel.classList.remove('is-active');
						}
					}
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

		if (this.hasAttribute('role') === false) {
			this.setAttribute('role', 'tablist');
		}

		this.first();

		this.events.add();

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

	}

	/**
	 * @method	first
	 */
	first() {
		const tabs = this.tabs;
		if (tabs.length) {
			const firstTab = tabs[0];
			const { value } = firstTab;
			firstTab.classList.add('is-active');
			this.active = value;
		}
	}

	/**
	 * @method	next
	 */
	next() {

	}

	/**
	 * @method	prev
	 */
	prev() {

	}

	/**
	 * @method	last
	 */
	last() {
		const tabs = this.tabs;
		if (tabs.length) {
			const lastTab = tabs[tabs.length - 1];
			const { value } = lastTab;
			lastTab.classList.add('is-active');
			this.active = value;
		}
	}

}