import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the video element.
 */
export const template = new Template(() => /*template*/`

	<style>

		:host {
			all: initial;
			display: grid;
			grid-template:
				"video" 1fr
				"controls" auto / 1fr;
			grid-gap: 2px;
			gap: 2px;
			position: relative;
			font-size: 100%;
			font-family: inherit;
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

		.video {
			grid-area: video;
		}

		.controls {
			grid-area: controls;
			display: grid;
			grid-template:
				"play pause seeker mute" auto / auto auto 1fr auto;
			grid-gap: 2px;
			gap: 2px;
		}

		.controls-play {
			grid-area: play;
		}

		.controls-pause {
			grid-area: pause;
		}

		.controls-seeker {
			grid-area: seeker;
		}

		.controls-mute {
			grid-area: mute;
		}

		:host([loaded]) .map {
			opacity: 1;
			visibility: visible;
		}

		::slotted(.button[name]) {
			margin: 0;
		}

		@media all and (min-width: 48em) {

			

		}

		@media all and (min-width: 64em) {

			

		}

	</style>

	<div class="video">
		<slot name="video"></slot>
	</div>
	<div class="controls">
		<div class="controls-play">
			<slot name="play"></slot>
		</div>
		<div class="controls-pause">
			<slot name="pause"></slot>
		</div>
		<div class="controls-seeker">
			<slot name="seeker"></slot>
		</div>
		<div class="controls-mute">
			<slot name="mute"></slot>
		</div>
	</div>
`);