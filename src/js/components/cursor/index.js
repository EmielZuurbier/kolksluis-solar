import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';

template.render();

/**
 * Cursors element
 * 
 * @class
 * @extends	BaseElement
 */
export default class CursorElement extends BaseElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return ['click', 'hover'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();
		
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(template.clone());
	}

	/**
	 * Gets the cursor element from the Shadow DOM.
	 * @property
	 */
	get cursor() {
		return this.shadowRoot.querySelector('.cursor');
	}

    /**
	 * Gets and sets the hover attribute.
	 * @property
	 */
	get hover() {
		const value = this.getAttribute('hover')
		return value !== null;
	}

	set hover(value) {
		if (value === true) {
			this.setAttribute('hover', '');
		} else {
			this.removeAttribute('hover');
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
            case 'hover':
                if (newValue === '') {
                    const mouseEnterEvent = new Event('mouseenter');
                    this.dispatchEvent(mouseEnterEvent);
                } else {
                    const mouseLeaveEVent = new Event('mouseleave');
                    this.dispatchEvent(mouseLeaveEVent);
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

		let x = 0;
		let y = 0;

		const updatePosition = (x, y) => {
			this.style.transform = `translate3d(${x}px, ${y}px, 0)`;
		}

		window.addEventListener('mousemove', ({ pageX, pageY }) => {
			requestAnimationFrame(() => {
				x = pageX - (this.offsetWidth / 2);
				y = pageY - (this.offsetHeight / 2);
				updatePosition(x, y);
			});
		});

		window.addEventListener('wheel', ({ deltaY }) => {
			requestAnimationFrame(() => {
				let { scrollTop, offsetHeight, scrollHeight } = document.scrollingElement;
				let offset = scrollTop + offsetHeight;
				if (scrollTop > 0 && offset < scrollHeight) {
					y += deltaY;
					updatePosition(x, y);
				}
			});
		});

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