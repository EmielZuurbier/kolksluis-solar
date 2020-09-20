import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';
import { 
	onSubmit,
	onSlotChange
} from './events.js';

// Create a template.
template.render();

/**
 * Form wrapper element that creates an HTTP Post request
 * on the submission of the form inside. Response can be
 * caught by adding a 'response' listener to the ajax-form element.
 *
 * @class
 * @extends	BaseElement
 * 
 * @example
 * const ajaxForm = document.querySelector('ajax-form');
 * ajaxForm.addEventListener('response', ({ detail }) => {
 *     console.log(detail.response);
 * });
 */
export default class AJAXFormElement extends BaseElement {

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Attach Shadow DOM.
		const shadow = this.attachShadow({mode: 'open'});
		shadow.appendChild(template.clone());
		shadow.addEventListener('slotchange', onSlotChange.bind(this));

		// Create event property.
		this.onresponse = () => {};

		// Bind events to instance.
		// this.events.set(this, 'submit', onSubmit.bind(this));

	}

	/**
	 * Gets the forms assigned to the slots.
	 * 
	 * @property
	 */
	get forms() {
		const slot = this.shadowRoot.querySelector('slot');
		const forms = slot.assignedElements();
		return forms;
	}

}