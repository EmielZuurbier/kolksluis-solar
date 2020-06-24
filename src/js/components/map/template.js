import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the map element.
 */
export const template = new Template(() => /*template*/`

	<style>

		:host {
			all: initial;
			display: block;
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
			width: 100%;
			height: 100%;
		}

		.container {
			--gutter: 2px;
			display: grid;
			grid-template-rows: var(--gutter) 1fr var(--gutter) auto var(--gutter);
			grid-template-columns: var(--gutter) 1fr var(--gutter);
			height: 100%;
		}

		.container::before {
			grid-area: 1 / 1 / 6 / 4;
			content: "";
			background: var(--gradient-accent);
		}

		.message{
			grid-area: 2 / 2 / 3 / 3;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 1.5em;
			background-color: var(--color-dark-alt);
		}

		.message-content {
			font-family: var(--font-montserrat);
			font-size: 1em;
			color: var(--color-light-alt);
		}

		.map {
			grid-area: 2 / 2 / 3 / 3;
			opacity: 0;
			visibility: hidden;
			transition: var(--duration-average) ease-in;
			transition-property: opacity, visibility;
		}

		.controls {
			grid-area: 4 / 2 / 6 / 3;
			display: grid;
			grid-template:
				"center" auto
				"zoom-in" auto
				"zoom-out" auto / 1fr;
			grid-gap: 2px;
			gap: 2px;
		}

		.controls-center {
			grid-area: center;
		}

		.controls-zoom-in {
			grid-area: zoom-in;
		}

		.controls-zoom-out {
			grid-area: zoom-out;
		}

		:host([loaded]) .map {
			opacity: 1;
			visibility: visible;
		}

		.mapboxgl-control-container {
			display: none;
		}

		::slotted(.button) {
			width: 100%;
			margin: 0;
		}

		@media all and (min-width: 48em) {

			.controls {
				grid-template:
					"center center" auto
					"zoom-in zoom-out" auto / 1fr 1fr;
			}

		}

		@media all and (min-width: 64em) {

			.controls {
				grid-template:
					"center zoom-in zoom-out" 1fr / 1fr auto auto;
			}

		}

	</style>

	<div class="container">
		<div class="message">
			<span class="message-content">De kaart wordt geladen</span>
		</div>
		<div class="map"></div>
		<div class="controls">
			<div class="controls-center">
				<slot name="center"></slot>
			</div>
			<div class="controls-zoom-in">
				<slot name="zoom-in"></slot>
			</div>
			<div class="controls-zoom-out">
				<slot name="zoom-out"></slot>
			</div>
		</div>
	</div>
`);