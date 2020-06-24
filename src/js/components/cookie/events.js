import Cookies from 'Classes/cookies/cookies.js';

/**
 * Helper function to append a script string to
 * the head or the body tag in the appropriate place.
 * 
 * @function	insertScript
 * @param 		{string} script Script to append.
 * @param		{HTMLElement} element Element to append to.
 * @param 		{string} destination The head or body.
 * @returns		{(string|HTMLElement)}
 */
const insertScript = (script, element, position = 'beforeend') => {
	const destination = document.querySelector(element);
	if ('string' !== typeof script) {
		throw Error('script is not a string');
	}
	if (destination === null) {
		throw Error('element to insert to is null');
	}
	if ('string' !== typeof position) {
		throw Error('position is not a string');
	}
	destination.insertAdjacentHTML(position, script);
	return element;
};

/**
 * @function	onClick
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onClick = function onClick(event) {
	const button = event.target.closest('button');
	if (button !== null) {
		const { name } = button;
		if (name === 'accept') {
			Cookies.set(this.name, 'accepted');
			this.getCookieScripts().then(({ head, body }) => {
				insertScript(head, 'head');
				insertScript(body.start, 'body', 'afterbegin');
				insertScript(body.end, 'body');
			}).catch(error => {
				console.log(error);
			});
		} else {
			Cookies.set(this.name, 'refused');
		}
		this.open = false;
	}
}

/**
 * @function	onSubmit
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSubmit = function onSubmit(event) {
	event.preventDefault();
};

/**
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange({ target }) {
	const elements = target.assignedElements();
	for (const element of elements) {
		const form = element.querySelector('form');
		form.addEventListener('click', onClick.bind(this));
		form.addEventListener('submit', onSubmit.bind(this));
	}
};