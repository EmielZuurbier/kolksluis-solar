/* jshint esversion: 6 */

import CustomElementsDefiner from 'Classes/custom-elements/definer.js';
import BannerElement from 'Components/banner/index.js';
import MenuElement from 'Components/menu/index.js';
import FlyOutElement from 'Components/flyout/index.js';
import MapBoxElement from 'Components/map/index.js';
import InputElement from 'Components/input/index.js';
import AJAXFormElement from 'Components/form/index.js';
import BackdropElement from 'Components/backdrop/index.js';
import CursorElement from 'Components/cursor/index.js';

const definer = new CustomElementsDefiner('kss')
	.add('banner', BannerElement)
	.add('menu', MenuElement)
	.add('flyout', FlyOutElement)
	.add('map', MapBoxElement)
	.add('input', InputElement)
	.add('form', AJAXFormElement)
	.add('backdrop', BackdropElement)
	.add('cursor', CursorElement)
	.defineAll();

const menu = document.querySelector('.js-menu');
const menuToggle = document.querySelector('.js-menu-toggle');

menuToggle.addEventListener('click', function({ target }) {
	const toggle = target.closest('.js-menu-toggle');
	const id = toggle.getAttribute('aria-controls');
	const menu = document.getElementById(id);
	const flyouts = document.querySelectorAll('.js-flyout');
	for (const flyout of flyouts) {
		flyout.open = false;
	}
	menu.toggle();
	document.body.classList.toggle('is-menu-open');
});

menu.addEventListener('open', function() {
	menuToggle.setAttribute('aria-expanded', 'true');
});

menu.addEventListener('close', function() {
	menuToggle.setAttribute('aria-expanded', 'false');
});

const ignoreInputs = ['hidden', 'submit', 'button'];
const contactForm = document.getElementById('contact-form');
if (contactForm !== null) {
	contactForm.addEventListener('response', event => {
		const { detail: { response } } = event;
		const { message, status, redirect } = response;
		if (status === 'success') {
			if (redirect !== false) {
				location.replace(redirect);
			}
			// const forms = contactForm.querySelectorAll('kss-input');
			// for (const form of forms) {
			// 	for (const input of form.elements) {
			// 		if (!ignoreInputs.includes(input.type))
			// 		input.value = '';
			// 	}
			// }
		} else {

		}
	});
}