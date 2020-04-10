
/**
 * 
 * @param 	{Event} event
 * @returns	{void} 
 */
const onButtonClick = function onButtonClick(event) {
	this.toggle();
};

/**
 * 
 * @param 	{Event} event
 * @returns	{void} 
 */
export const onSlotChange = function onSlotChange(event) {
	const { target } = event;
	const { name } = target;
	const elements = target.assignedElements();

	if (name === 'button') {
		for (const element of elements) {
			element.addEventListener('click', onButtonClick.bind(this));
		}
	}

};