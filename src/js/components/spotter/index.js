import BaseElement from 'Classes/custom-elements/base-element.js';

/**
 * Element that observes child elements that come into view.
 * Whenever an observed element comes into view it fires a spotter event
 * on that element. Uses IntersectionObserver to observe the elements.
 * 
 * See the docs for the IntersectionObserver on changing the properties mentioned above.
 * @link	https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * 
 * @class
 * @extends	HTMLElement
 */
export default class SpotterElement extends BaseElement {

	/**
	 * Stores the IntersectionObserver instance.
	 * @private
	 */
	#observer = null;

	/**
	 * Only call super to inherit BaseElement properties.
	 */
	constructor() {
		super();
	}

	/**
	 * Gets and sets the observer instance.
	 * @property
	 */
	get observer() {
		return this.#observer;
	}

	set observer(instance) {
		if (instance instanceof IntersectionObserver) {
			this.#observer = instance;
		}
	}

	/**
	 * Gets and sets the root attribute.
	 * @property
	 */
	get root() {
		return this.getAttribute('root');
	}

	set root(value) {
		if ('string' === typeof value) {
			this.setAttribute('root', value);
		} 
	}

	/**
	 * Gets and sets the root-margin attribute.
	 * @property
	 */
	get rootMargin() {
		return this.getAttribute('root-margin');
	}

	set rootMargin(value) {
		if ('string' === typeof value) {
			this.setAttribute('root-margin', value);
		} 
	}

	/**
	 * Gets and sets the threshold attribute.
	 * @property
	 */
	get threshold() {
		const attr = this.getAttribute('threshold');
		if (attr === null) {
			return attr;
		}
		return attr.split(',').map(item => Number(item));
	}

	set threshold(value) {
		if (Array.isArray(value)) {
			this.setAttribute('threshold', value);
		}
	}

	/**
	 * Gets and sets the selector attribute.
	 * @property
	 */
	get selector() {
		return this.getAttribute('selector');
	}

	set selector(value) {
		if ('string' === typeof value) {
			this.setAttribute('targets', value);
		} else if (Array.isArray(value)) {
			this.setAttribute('target', value.join(', '));
		}
	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		// Add a default root.
		if (this.root === null) {
			this.root = null;
		}

		// Add a default root margin
		if (this.rootMargin === null) {
			this.rootMargin = '0px'
		}

		// Add a default threshold
		if (this.threshold === null) {
			this.threshold = [0];
		}

		// Get the values of the attributes.
		const { root, rootMargin, threshold } = this;

		// Check for options.
		const intersectionOptions = {
			root, 
			rootMargin, 
			threshold 
		};

		// Call spotted event when an element is spotted.
		const onIntersection = (entries, observer) => {
			entries.forEach(({ target, isIntersecting }) => {
				if (isIntersecting) {
					const spottedEvent = new CustomEvent('spotted', {
						bubbles: true,
						cancelable: true
					});
					target.dispatchEvent(spottedEvent);
					observer.unobserve(target);
				}
			});
		}

		// Create a new observer.
		const observer = new IntersectionObserver(onIntersection, intersectionOptions);

		// Get all the targets and observe them.
		const targets = this.querySelectorAll(this.selector);
		for (const target of targets) {
			observer.observe(target);
		}

		// Store the observer instance.
		this.observer = observer;

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		if (this.observer instanceof IntersectionObserver) {
			this.observer.disconnect();
		}

	}

} 