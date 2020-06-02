import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the backdrop element.
 */
export const template = new Template(() => /*template*/`
    
    <style>

        :host {
            all: initial;
            display: grid;
            grid-template:
                "canvas" 1fr / 1fr;
            contain: content;
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
		
		canvas {
			grid-area: canvas;
		}
        
    </style>
	
	<canvas></canvas>

`);