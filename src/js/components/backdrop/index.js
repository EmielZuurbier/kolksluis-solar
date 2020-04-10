import BaseElement from 'Classes/custom-elements/base-element.js';
import Line from './props/line.js';
import { template } from './template.js';

// Render template
template.render();

class Backdrop extends BaseElement {

	#context = null;

	#state = 'paused';

	#loop = null;

	constructor() {
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(template.clone());
		this.#context = this.canvas.getContext('2d');
	}

	/**
	 * Gets the canvas element from the shadow.
	 * @property
	 */
	get canvas() {
		return this.shadowRoot.querySelector('canvas');
	}

	/**
	 * Gets the context of the canvas.
	 * @property
	 */
	get context() {
		return this.#context;
	}

	/**
	 * Gets the state value.
	 */
	get state() {
		return this.#state;
	}

	render(callback) {
		if (this.#state === 'running') {
			this.stop();
		}
		this.#state = 'running';
		this.#loop = requestAnimationFrame(this.render);
	}

	stop() {
		cancelAnimationFrame(this.#loop);
		this.#state = 'paused';
	}

}