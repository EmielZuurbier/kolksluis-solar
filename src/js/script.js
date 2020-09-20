/* jshint esversion: 6 */

import CustomElementsDefiner from 'Classes/custom-elements/definer.js';
import CookieElement from 'Components/cookie/index.js';
import BannerElement from 'Components/banner/index.js';
import MenuElement from 'Components/menu/index.js';
import FlyOutElement from 'Components/flyout/index.js';
import MapBoxElement from 'Components/map/index.js';
import InputElement from 'Components/input/index.js';
import AJAXFormElement from 'Components/form/index.js';
import BackdropElement from 'Components/backdrop/index.js';
import LazyElement from 'Components/lazy/index.js';
import SliderElement from 'Components/slider/index.js';
import SlideElement from 'Components/slide/index.js';
import VideoElement from 'Components/video/index.js';
import SetupElement from 'Components/setup/index.js';
import SpotterElement from 'Components/spotter/index.js';
import MessageElement from 'Components/message/index.js';

const definer = new CustomElementsDefiner('kss')
	.add('cookie', CookieElement)
	.add('banner', BannerElement)
	.add('menu', MenuElement)
	.add('flyout', FlyOutElement)
	.add('map', MapBoxElement)
	.add('input', InputElement)
	.add('form', AJAXFormElement)
	.add('backdrop', BackdropElement)
	.add('lazy', LazyElement)
	.add('slider', SliderElement)
	.add('slide', SlideElement)
	.add('video', VideoElement)
	.add('setup', SetupElement)
	.add('spotter', SpotterElement)
	.add('message', MessageElement)
	.defineAll();

const menu = document.querySelector('.js-menu');
const menuToggle = document.querySelector('.js-menu-toggle');

menuToggle.addEventListener('click', function({ target, currentTarget }) {
	const menuId = currentTarget.getAttribute('aria-controls');
	const menu = document.getElementById(menuId);
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

document.addEventListener('spotted', ({ target }) => {
	target.classList.add('animate');
});