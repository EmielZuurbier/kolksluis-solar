import BaseElement from 'Classes/custom-elements/base-element.js';
import { onScroll } from './events.js';
import { hasFeatures } from 'Utilities/tools.js';

// Check for passive events.
const passive = hasFeatures('Passive Events') ? { passive: true } : false;

/**
 * Banner element that responds on the scrolling of the document.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class BannerElement extends BaseElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['threshold'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();
		
		// Create a list of all events and their listeners.
		this.events.set(document, 'scroll', onScroll.bind(this), passive);

		// Save last scrolled position.
		this.lastScrollTop = document.scrollingElement.scrollTop || document.documentElement.scrollTop;

	}

	/**
	 * Gets and sets the down attribute.
	 * @property
	 */
	get down() {
		return this.getAttribute('down');
	}

	set down(value) {
		if (value === true) {
			this.setAttribute('down', '');
		} else {
			this.removeAttribute('down');
		}
	}

	/**
	 * Gets and sets the room attribute.
	 * @property
	 */
	get room() {
		return this.getAttribute('room');
	}

	set room(value) {
		if (value === true) {
			this.setAttribute('room', '');
		} else {
			this.removeAttribute('room');
		}
	}
    
    /**
	 * Gets and sets the scrolled attribute.
	 * @property
	 */
	get scrolled() {
		return this.getAttribute('scrolled');
	}

	set scrolled(value) {
		if (value === true) {
			this.setAttribute('scrolled', '');
		} else {
			this.removeAttribute('scrolled');
		}
	}

	/**
	 * Gets and sets the sticky attribute.
	 * @property
	 */
	get sticky() {
		return this.getAttribute('sticky');
	}

	set sticky(value) {
		if (value === true) {
			this.setAttribute('sticky', '');
		} else {
			this.removeAttribute('sticky');
		}
	}

	/**
	 * Gets and sets the threshold attribute.
	 * @property
	 */
	get threshold() {
		return parseInt(this.getAttribute('threshold'));
	}

	set threshold(value) {
		const number = Number(value);
		if (!Number.isNaN(number)) {
			this.setAttribute('threshold', number);
		} else {
			this.removeAttribute('threshold');
		} 
	}

	/**
	 * Gets and sets the up attribute.
	 * @property
	 */
	get up() {
		return this.getAttribute('up');
	}

	set up(value) {
		if (value === true) {
			this.setAttribute('up', '');
		} else {
			this.removeAttribute('up');
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

		switch(attrName) {
			case 'threshold':

				// Check if the banner is over threshold when changing it.
				onScroll.call(this);
				
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		// Set default threshold if it is not set.
		if (isNaN(this.threshold)) {
			this.threshold = this.offsetHeight + this.offsetTop;
		}

        // Listen to the events.
        this.events.add();

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

        // Remove the event listeners.
        this.events.remove();

	}

	/**
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

		// Set default threshold if it is not set.
		if (isNaN(this.threshold)) {
			this.threshold = this.offsetHeight + this.offsetTop;
		}

        // Listen to the events.
        this.events.add();

	}

}