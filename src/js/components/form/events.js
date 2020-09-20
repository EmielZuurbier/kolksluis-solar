import { postFormData } from 'Utilities/fetch.js';
import Template from 'Classes/templates/template.js';

/**
 * Create message template 
 */
const messageTemplate = new Template(({ status,  message }) => /* template */`
	<kss-message delay="6000" active type="${status}">
		<p slot="content">${message}</p>
		<button slot="button" class="button button--message">
			<span class="button__label">Sluiten</span>
			<div class="button__icon">
				<i class="fas fa-times"></i>
			</div>
		</button>
	</kss-message>
`);

const ignoreInputs = ['hidden', 'submit', 'button'];

/**
 * Sends a HTTP Post request when submitting the form.
 * An input with name action has to be defined to call the correct PHP function.
 * 
 * @function	onSubmit
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSubmit = async function onSubmit(event) {

	// Prevent default submit.
	event.preventDefault();

	// Get the data from the form and send a request.
	const data = new FormData(event.target);
	const response = await postFormData(data);

	console.log(response);

	const { message, status, redirect } = response;
	if (message !== '') {
		messageTemplate.render({ status, message });
		messageTemplate.appendTo(document.body);
	}
	if (status === 'success') {
		// if (redirect !== false) {
		// 	location.replace(redirect);
		// }
		
		for (const form of this.forms) {
			for (const input of form.elements) {
				if (!ignoreInputs.includes(input.type)) {
					const blurEvent = new Event('blur');
					input.value = '';
					input.dispatchEvent(blurEvent);
				}
				
			}
		}
	} 

};

/**
 * slotchange event handler.
 * 
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange(event) {

	// Get the slot and the events
	const { target } = event;
	const elements = target.assignedElements();

	// Set the events to the assignedElements.
	for (const element of elements) {
		element.addEventListener('submit', onSubmit.bind(this));
	}
		
};