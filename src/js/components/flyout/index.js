import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';
import { onSlotChange } from './events.js';
import { hasFeatures } from 'Utilities/tools.js';

// Check for animation support.
const hasAnimationSupport = hasFeatures('Web Animation API')

// Render template
template.render();

/**
 * Flyout element
 * 
 * @class
 * @extends	BaseElement
 */
export default class FlyOutElement extends BaseElement {

	#animationOptions = {
		duration: 350,
		fill: 'none',
		easing: 'cubic-bezier(0.42, 0, 0.12, 0.97)'
	};

	#open = () => {
		const openEvent = new Event('open');
		if (hasAnimationSupport) {
			for (const subMenu of this.subMenus) {
				const height = subMenu.firstElementChild.offsetHeight;
				subMenu.animate([
					{ maxHeight: '0px' },
					{ maxHeight: `${height}px` }
				], this.#animationOptions);
			}
		}
		this.dispatchEvent(openEvent);
		this.setAttribute('aria-expanded', true);
	}

	#close = () => {
		const closeEvent = new Event('close');                    
		if (hasAnimationSupport) {
			for (const subMenu of this.subMenus) {
				const height = subMenu.firstElementChild.offsetHeight;
				subMenu.animate([
					{ maxHeight: `${height}px` },
					{ maxHeight: '0px' }
				], this.#animationOptions);
			}
		}
		this.dispatchEvent(closeEvent);
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
	 * Gets the anchor assigned elements that are assigned to the slot.
	 * @property
	 */
	get anchors() {
		const slot = this.shadowRoot.querySelector('slot[name="anchor"]');
		return slot.assignedElements();
	}

	/**
	 * Gets the button assigned elements that are assigned to the slot.
	 * @property
	 */
	get buttons() {
		const slot = this.shadowRoot.querySelector('slot[name="button"]');
		return slot.assignedElements();
	}

	/**
	 * Gets the sub-menu assigned elements that are assigned to the slot.
	 * @property
	 */
	get subMenus() {
		const slot = this.shadowRoot.querySelector('slot[name="sub-menu"]');
		return slot.assignedElements();
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
					this.#open();
                } else {
					this.#close();
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