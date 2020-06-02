import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the map element.
 */
export const template = new Template(() => /*template*/`

	<style>

		:host {
			all: initial;
			position: relative;
			display: grid;
			grid-template:
				"map" 1fr / 1fr;
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

		.message{
			grid-area: map;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 1.5em;
		}

		.message-content {
			font-family: var(--font-montserrat);
			font-size: 1em;
			color: var(--color-light-alt);
		}

		.map {
			grid-area: map;
			opacity: 0;
			visibility: hidden;
			transition: var(--duration-average) ease-in;
			transition-property: opacity, visibility;
		}

		:host([loaded]) .map {
			opacity: 1;
			visibility: visible;
		}

		.mapboxgl-control-container {
			display: none;
		}

	</style>

	<div class="message">
		<span class="message-content">De kaart wordt geladen</span>
	</div>
	<div class="map"></div>
`);