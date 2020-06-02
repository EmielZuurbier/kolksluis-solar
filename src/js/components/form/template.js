import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the form element.
 */
export const template = new Template(() => /*template*/`

	<style>

		:host {
			all: initial;
			position: relative;
			font-size: 100%;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			-webkit-text-size-adjust: 100%;
			-moz-text-size-adjust: 100%;
			text-rendering: optimizeLegibility;
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}

	</style>

	<slot></slot>
`);