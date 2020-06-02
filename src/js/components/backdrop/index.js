import BaseElement from 'Classes/custom-elements/base-element.js';
import { template } from './template.js';

// Render template
template.render();

export default class BackdropElement extends BaseElement {

	/**
	 * @private
	 */
	#context = null;

	/**
	 * @private
	 */
	#state = 'paused';

	/**
	 * @private
	 */
	#loop = null;

	/**
	 * @private
	 */
	#observer = null;

	/**
	 * @constructor
	 */
	constructor() {
		super();
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
	 * Gets and sets the canvas height attribute.
	 */
	get canvasHeight() {
		return this.canvas.height;
	}


	set canvasHeight(value) {
		this.canvas.setAttribute('height', value);
	}

	/**
	 * Gets and sets the canvas width attribute.
	 */
	get canvasWidth() {
		return this.canvas.width;
	}

	set canvasWidth(value) {
		this.canvas.setAttribute('width', value);
	}

	/**
	 * Gets the canvas top offset.
	 */
	get canvasOffsetTop() {
		const bounds = this.getBoundingClientRect();
		return bounds.top + window.pageYOffset;
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

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		const ctx = this.context;
		const lineWidth = 2;
		const lineColor = '#111111';
		const lineOpacity = 0.5;
		const diamondColor = '#222222';
		const diamonOpacity = 1;
		
		this.canvasHeight = this.offsetHeight;
		this.canvasWidth = this.offsetWidth;
		
		let height = this.canvasHeight;
		let width = this.canvasWidth;
		let offsetTop = this.canvasOffsetTop;

		let mouseX = 0;
		let mouseY = 0;

		const createVerticalLines = gutter => {
			let correction = (width % gutter) / 2;
			let column = (gutter / 2) + correction;
			ctx.save();
			for (column; column < width; column += gutter) {
				ctx.beginPath();
				ctx.fillStyle = lineColor;
				ctx.globalAlpha = lineOpacity;
				ctx.fillRect(column, 0, lineWidth, height);
			}
			ctx.restore();
		};

		const createHorizontalLines = gutter => {
			let row = gutter / 2;
			ctx.save();
			for (row; row < height; row += gutter) {
				ctx.beginPath();
				ctx.fillStyle = lineColor;
				ctx.globalAlpha = lineOpacity;
				ctx.fillRect(0, row, width, lineWidth);
			}
			ctx.restore();
		};

		const createDiamonds = (gutterWidth, gutterHeight) => {
			let horizontalCorrection = (width % gutterWidth) / 2;
			let x = (gutterWidth / 2) + horizontalCorrection;
			let size = 13;
			let sizeCorrection = (size / 2);
			ctx.save();
			for (x += 1; x < width; x += gutterWidth) {
				let y = gutterHeight / 2;
				for (y += 1; y < height; y += gutterHeight) {
					ctx.beginPath();
					ctx.moveTo(x - sizeCorrection, y);
					ctx.lineTo(x, y - sizeCorrection);
					ctx.lineTo(x + sizeCorrection, y);
					ctx.lineTo(x, y + sizeCorrection);
					ctx.closePath();
					ctx.fillStyle = diamondColor;
					ctx.globalAlpha = diamonOpacity;
					ctx.fill();
				}
			}
			ctx.restore();
		};

		const createGlare = (x, y, radius) => {
			ctx.save();
			ctx.beginPath();
			ctx.globalAlpha = 1;
			let radialGradient = ctx.createRadialGradient(x, y, 1, x, y, radius);
			radialGradient.addColorStop(0, 'hsla(30, 59%, 51%, 0.5)');
			radialGradient.addColorStop(0.3, 'hsla(356, 41%, 49%, 0.3)');
			radialGradient.addColorStop(0.6, 'hsla(293, 52%, 27%, 0.2)');
			radialGradient.addColorStop(0.8, 'hsla(256, 59%, 41%, 0.1)');
			radialGradient.addColorStop(1, 'hsla(256, 59%, 41%, 0)');
			ctx.fillStyle = radialGradient;
			ctx.arc(x, y, radius, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();
			ctx.globalCompositeOperation = 'lighten';
			ctx.restore();
		};

		const renderCallback = () => {
			ctx.clearRect(0, 0, width, height);
			createVerticalLines(150);
			createHorizontalLines(200);
			createDiamonds(150, 200);
			createGlare(mouseX, mouseY, 350);
		};

		this.#observer = new ResizeObserver(entries => {
			for (const entry of entries) {
				this.canvasHeight = entry.target.offsetHeight;
				this.canvasWidth = entry.target.offsetWidth;
				height = this.canvasHeight;
				width = this.canvasWidth;
				offsetTop = this.canvasOffsetTop;
				renderCallback();
			}
		});

		this.#observer.observe(this);

		window.addEventListener('mousemove', ({ pageX, pageY }) => {
			requestAnimationFrame(() => {
				mouseX = pageX;
				mouseY = pageY - offsetTop;
				renderCallback();
			});
		});

		window.addEventListener('wheel', ({ deltaY }) => {
			requestAnimationFrame(() => {
				let { scrollTop, offsetHeight, scrollHeight } = document.scrollingElement;
				let offset = scrollTop + offsetHeight;
				if (scrollTop > 0 && offset < scrollHeight) {
					mouseY += deltaY;
					renderCallback();
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

		this.#observer.unobserve(this);

	}

	/**
	 * Start the rendering loop.
	 * 
	 * @method	render
	 * @param 	{function} callback 
	 * @returns	{void}
	 */
	render(callback) {
		if (this.#state === 'running') this.stop();
		this.#state = 'running';
		callback();
		this.#loop = requestAnimationFrame(() => {
			this.render(callback);
		});
	}

	/**
	 * Stop the rendering loop.
	 * 
	 * @method	stop 
	 */
	stop() {
		cancelAnimationFrame(this.#loop);
		this.#state = 'paused';
	}

}