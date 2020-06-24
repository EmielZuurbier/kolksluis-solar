import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the cookie element.
 */
export const template = new Template(() => /*template*/`

	<style>

		:host {
			all: initial;
			contain: content;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			-webkit-text-size-adjust: 100%;
			-moz-text-size-adjust: 100%;
			text-rendering: optimizeLegibility;
			font-family: inherit;
			font-size: 100%;
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			z-index: 10;
		}

	</style>

	<slot></slot>

`);