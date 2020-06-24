import Template from 'Classes/templates/template.js';

/**
 * Creates a template specific for the slider element.
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
            --controls-layout:
                "prev . next" 1fr / auto 1fr auto;
            --rails-direction: row;
            --slide-size: 100%;
            --slide-padding: 0;

            --wrapper-area: wrapper;
            --controls-area: controls;
            --prev-area: prev;
            --next-area: next;

            all: initial;
            display: block;
            position: relative;
            font-size: 100%;
        }

        .container {
            display: grid;
            grid-template: 
                "wrapper" 1fr
                "controls" auto / 1fr;
            grid-gap: 2px;
            gap: 2px;
            height: 100%;
            width: 100%;
        }

        .controls {
            grid-area: var(--controls-area);
            display: grid;
            grid-template: 
                "prev next" 1fr / 1fr 1fr;
            grid-gap: 2px;
            gap: 2px;
            padding: 0 1em;
            z-index: 1;
        }

        .prev {
            grid-area: var(--prev-area);
        }

        .next {
            grid-area: var(--next-area);
        }

        .wrapper {
            grid-area: var(--wrapper-area);
            position: relative;
            overflow: hidden;
            z-index: 1;
        }

        .rails {
            display: flex;
            align-items: stretch;
            flex-wrap: nowrap;
            flex-direction: var(--rails-direction);
            height: 100%;
            will-change: transform;
        }

        :host([axis="horizontal"]) .rails {
            --rails-direction: row;
        }

        :host([axis="vertical"]) .rails {
            --rails-direction: column;
        }

        ::slotted([slot="slide"]) {
            flex-grow: 0;
            flex-shrink: 0;
            padding: var(--slide-padding);
        }

        :host([axis="horizontal"]) ::slotted([slot="slide"]) {
            width: var(--slide-size);
            --slide-padding: 0 15px;
        }

        :host([axis="vertical"]) ::slotted([slot="slide"] {
            height: var(--slide-size);
            --slide-padding: 15px 0;
        }

        :host([amount="1"]) ::slotted([slot="slide"]) {
            --slide-size: 100%;
        }

        :host([amount="2"]) ::slotted([slot="slide"]) {
            --slide-size: 50%;
        }

        :host([amount="3"]) ::slotted([slot="slide"]) {
            --slide-size: 33.3333333333%;
        }

        :host([amount="4"]) ::slotted([slot="slide"]) {
            --slide-size: 25%;
        }

        :host([amount="5"]) ::slotted([slot="slide"]) {
            --slide-size: 20%;
        }

        :host([amount="6"]) ::slotted([slot="slide"]) {
            --slide-size: 16.6666666667%;
        }

        :host([amount="7"]) ::slotted([slot="slide"]) {
            --slide-size: 14.2857142857%;
        }

        :host([amount="8"]) ::slotted([slot="slide"]) {
            --slide-size: 12.5%;
        }

        :host([amount="9"]) ::slotted([slot="slide"]) {
            --slide-size: 11.1111111111%;
        }

        :host([amount="10"]) ::slotted([slot="slide"]) {
            --slide-size: 10%;
        }

    </style>

    <div class="container">

        <section class="wrapper" role="region" aria-roledescription="carousel">
            <div class="rails" 	aria-live="polite" draggable>
                <slot name="slide"></slot>
            </div>
        </section>

        <div class="controls">
            <div class="prev">
                <slot name="prev"></slot>
            </div>
            <div class="next">
                <slot name="next"></slot>
            </div>
        </div>

    </div>

`);