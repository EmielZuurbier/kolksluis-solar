import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the slide element.
 */
export const template = new Template(() => /*template*/`
    
    <style>

        *, 
        *::before, 
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :host {
            all: initial;
            display: block;
            contain: content;
            position: relative;
            font-size: 100%;
        }
        
    </style>

    <slot></slot>

`);