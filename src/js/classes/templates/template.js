/**
 * Wrapper for creating a reusable template string based on a callback given
 * by the user. The template string will be wrapped in a <template> element to
 * clone the instance of the rendered template.
 */
export default class Template {

	/**
	 * Rendered string of template.
	 * 
	 * @private
	 */
	#rendered = null;

	/**
	 * Store the callback to render the data with.
	 * 
	 * @private
	 */
	#renderCallback = null;

	/**
	 * Give a function which returns a template string to render your data.
	 * 
	 * @param 	{Function} renderCallback Function which returns a template string.
	 */
	constructor(renderCallback) {
		this.renderCallback = renderCallback;
	}

	/**
	 * Gets the rendered property
	 * 
	 * @property
	 */
	get rendered() {
		return this.#rendered;
	}
	
	/**
	 * Gets and sets the renderCallback property.
	 * 
	 * @property
	 */
	get renderCallback() {
		return this.#renderCallback;
	}

	/**
	 * @property
	 */
	set renderCallback(value) {
		if ('function' === typeof value) {
			this.#renderCallback = value;
		}
	}

	/**
	 * Render the string by injecting any amount of arguments
	 * into the renderCallback given in the constructor.
	 * 
	 * @param 	{...any} args 
	 * @returns	{string}
	 */
	render(...data) {
		if (this.renderCallback === null) throw new Error('No renderCallback has been set');
		try {
			const template = document.createElement('template');
			const rendered = this.renderCallback(...data);
			template.innerHTML = rendered;
			this.#rendered = template;
			return template;
		} catch(error) {
			console.error('renderCallback error. Rendered value is reset to null.', error);
		}
		this.#rendered = null;
		return null;
	}

	/**
	 * Returns a cloned DocumentFragment from the rendered template.
	 * 
	 * @returns	{DocumentFragment}
	 */
	clone() {
		const rendered = this.rendered;
		if (rendered === null) throw new Error('There is no rendered template to clone. Render the template first before cloning.');
		const template = rendered.content.cloneNode(true);
		return template;
	}

	/**
	 * Uses Node.appendChild to insert a clone of 
	 * the template contents into the document.
	 * 
	 * @param 	{HTMLElement} target 
	 * @returns	{boolean}
	 */
	appendTo(target) {
		try {
			const template = this.clone();
			target.appendChild(template);
		} catch(error) {
			console.error(error);
		}
	}

}