import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the message element.
 */
export const template = new Template(() => /*template*/`

	<style>

		:host {
			all: initial;
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
		}

		.container {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}

		.content {
			flex: 1 1 auto;
			margin: 0 1.5em 0 0;
		}

		.button {
			flex: 1 0 auto;
		}

		@media all and (min-width: 48em) {

			.container {
				flex-wrap: nowrap;
			}

		}

	</style>

	<div class="container">

		<div class="content">
			<slot name="content"></slot>
		</div>

		<div class="button">
			<slot name="button"></slot>
		</div>

	</div>


`);