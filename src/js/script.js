/* jshint esversion: 6 */

import CustomElementsDefiner from 'Classes/custom-elements/definer.js';
import BannerElement from 'Components/banner/index.js';
import MenuElement from 'Components/menu/index.js';
import FlyOutElement from 'Components/flyout/index.js';

const definer = new CustomElementsDefiner('kss')
	.add('banner', BannerElement)
	.add('menu', MenuElement)
	.add('flyout', FlyOutElement)
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