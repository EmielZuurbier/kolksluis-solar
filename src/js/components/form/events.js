import { postFormData } from 'Utilities/fetch.js';

export const onClick = function onClick(event) {

	event.preventDefault();
	grecaptcha.ready(function() {
		grecaptcha.execute('6Lcr86oZAAAAAOcnk6OExk1Mp8lT7RpB58891L-W', { action: 'submit' }).then(function(token) {

			console.log(token);

			// // Get the data from the form and send a request.
			// const data = new FormData(event.target);
			// const response = await postFormData(data);

			// // Dispatch a response event with the returned data.
			// const responseEvent = new CustomEvent('response', {
			// 	detail: { response }
			// });
			// this.dispatchEvent(responseEvent);

			// // Call onresponse property method.
			// if ('function' === typeof this.onresponse) {
			// 	this.onresponse(response);
			// }

			// Add your logic to submit to your backend server here.

		});
	});

};

/**
 * Sends a HTTP Post request when submitting the form.
 * An input with name action has to be defined to call the correct PHP function.
 * 
 * @function	onSubmit
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSubmit = async function onSubmit(event) {

	console.log('Submitting');

	// Prevent default submit.
	event.preventDefault();

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
		element.addEventListener('click', onClick.bind(this));
	}
		
};