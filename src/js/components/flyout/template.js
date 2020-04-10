import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the flyout element.
 */
export const template = new Template(() => /*template*/`
    
    <style>

        :host {
            all: initial;
			position: relative;
            display: grid;
			grid-template-rows: auto auto;
			grid-template-columns: 1fr auto;
			grid-template-areas:
				"anchor   button"
				"sub-menu sub-menu";
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
		
		.anchor {
			grid-area: anchor / anchor / button / button;
		}

		.button {
			grid-area: button;
			z-index: 1;
		}

		.sub-menu {
			grid-area: sub-menu;
		}
        
    </style>
	
	<div class="anchor">
		<slot name="anchor"></slot>
	</div>
	<div class="button">
		<slot name="button"></slot>
	</div>
	<div class="sub-menu">
		<slot name="sub-menu"></slot>
	</div>

`);