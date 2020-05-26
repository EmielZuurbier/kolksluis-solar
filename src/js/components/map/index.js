import BaseElement from 'Classes/custom-elements/base-element.js';

const insertMapBoxStyle = () => new Promise(resolve => {

});

const insertMapBoxScript = () => new Promise(resolve => {
	const src = 'https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.js';
	const script = document.createElement('script');
	script.src = src;
	script.addEventListener('load', resolve, { once: true });
	document.body.insertAdjacentElement('afterend', script);
});

/**
 * Map element
 * 
 * @class
 * @extends	BaseElement
 */
export default class MapElement extends BaseElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return ['in-view'];
	}

	/**
	 * @constructor
	 */
	constructor() {
        super();
    }

    /**
	 * Gets and sets the in-view attribute.
	 * @property
	 */
	get inView() {
		return this.getAttribute('in-view');
	}

	set inView(value) {
		if (value === true) {
			this.setAttribute('in-view', '');
		} else {
			this.removeAttribute('in-view');
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
           case 'in-view':

        }

    }

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {
	
		/**
		 * Intersection Observer callback.
		 * 
		 * @param 	{IntersectionObserverEntry[]} entries 
		 * @returns	{void}
		 */
		const onIntersection = (entries, observer) => {
			for (const { target, isIntersecting } of entries) {
				if (isIntersecting) {
					this.inView = true;
					observer.unobserve(target);
				}
			}
		}

		// Create instance of observer.
		const observer = new IntersectionObserver(onIntersection, {
			root: null,
			rootMargin: '0px',
			threshold: [0]
		});

		// Observer the current element.
		observer.observe(this);

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