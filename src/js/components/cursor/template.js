import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the cursor element.
 */
export const template = new Template(() => /*template*/`

	<style>

		:host {
			all: initial;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			-webkit-text-size-adjust: 100%;
			-moz-text-size-adjust: 100%;
			text-rendering: optimizeLegibility;
			position: absolute;
			top: 0;
			left: 0;
			font-size: 100%;
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			z-index: 10;
			pointer-events: none;
			will-change: transform;
		}

		.cursor-inner {
			display: block;
			width: 1.25em;
			height: 1.25em;
			box-shadow: var(--panel-shadow);
			z-index: 1;
			/* border-radius: 50%; */
			border: 0.5em solid var(--color-light);
			background-color: var(--color-sun);
			box-sizing: inherit;
			transform: rotate(45deg);
		}

	</style>

	<div class="cursor-inner"></div>

`);