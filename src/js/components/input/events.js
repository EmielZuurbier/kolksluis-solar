
/**
 * Input focus event.
 * 
 * @param 	{Event} event
 * @returns	{void} 
 */
export const onInputFocus = function onInputFocus(event) {
	if (this.focus === false) {
		this.focus = true;
	}
}

/**
 * Input blur event.
 * 
 * @param 	{Event} event
 * @returns	{void} 
 */
const onInputBlur = function onInputBlur({ target }) {
	const { value } = target;
	if (this.focus === true && value === '') {
		this.focus = false;
	}
}

/**
 * Slotchange event.
 * 
 * @param 	{Event} event 
 * @returns	{void}
 */
export const onSlotChange = function onSlotChange(event) {
	const { target } = event;
	const { name } = target;
	
	if (name === 'input') {
		const inputs = target.assignedElements();
		for (const input of inputs) {
			input.addEventListener('focus', onInputFocus.bind(this));
			input.addEventListener('blur', onInputBlur.bind(this));
			if (input.value !== '') {
				this.focus = true;
			}
		}
	}
}