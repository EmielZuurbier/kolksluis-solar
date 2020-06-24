import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';
import { onSlotChange } from './events.js';

template.render();

/**
 * Video element
 * 
 * @class
 * @extends	BaseElement
 */
export default class VideoElement extends BaseElement {

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
		
		const shadow = this.attachShadow({mode: 'open'});
		shadow.appendChild(template.clone());
		shadow.addEventListener('slotchange', onSlotChange.bind(this));
	}

	get videoElement() {
		const slot = this.shadowRoot.querySelector('slot[name="video"]');
		return slot.assignedElements()[0];
	}

	get playElement() {
		const slot = this.shadowRoot.querySelector('slot[name="play"]');
		return slot.assignedElements()[0];
	}

	get pauseElement() {
		const slot = this.shadowRoot.querySelector('slot[name="pause"]');
		return slot.assignedElements()[0];
	}

	get muteElement() {
		const slot = this.shadowRoot.querySelector('slot[name="mute"]');
		return slot.assignedElements()[0];
	}

	get seekerElement() {
		const slot = this.shadowRoot.querySelector('slot[name="seeker"]');
		return slot.assignedElements()[0];
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

	play() {
		this.videoElement.play().then(() => {
			this.pauseElement.classList.remove('button--active');
			this.playElement.classList.add('button--active');
		}).catch(error => {
			console.error(error);
		})
	}

	pause() {
		this.videoElement.pause();
		this.playElement.classList.remove('button--active');
		this.pauseElement.classList.add('button--active');
	}
	
}