import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the setup element.
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
			font-family: inherit;
			font-size: 100%;
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			z-index: 10;
		}

		.container {
			display: grid;
			grid-template:
				"image panels" auto
				"image tabs" auto / 1fr 20em;
			grid-gap: 2px;
			gap: 2px;
		}

		.image {
			grid-area: image;
			background-color: var(--color-dark-alt);
		}

		.panels {
			grid-area: panels;
			display: grid;
			grid-template-rows: 1fr;
			grid-template-columns: 1fr;
			background-color: var(--color-dark-alt);
		}

		.panels ::slotted(*) {
			grid-area: 1 / 1 / 2 / 2;
		}

		.tabs {
			grid-area: tabs;
			display: grid;
			grid-auto-rows: auto;
			grid-template-columns: 1fr;
			grid-gap: 2px;
			gap: 2px;
		}

	</style>

	<div class="container">
		<div class="image">
			<slot name="image"></slot>
		</div>
		<div class="panels">
			<slot name="panel"></slot>
		</div>
		<div class="tabs">
			<slot name="tab"></slot>
		</div>
	</div>

`);