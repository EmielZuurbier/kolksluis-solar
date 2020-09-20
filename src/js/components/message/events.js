
export const onMessageClick = function onMessageClick(event) {
	this.deactivate();
};

export const onMessageKeyUp = function onMessageKeyUp(event) {
	
};

export const onSlotChange = function onSlotChange(event) {
	const { target } = event;
	if (target.name === 'button') {
		const elements = target.assignedElements();
		for (const element of elements) {
			element.addEventListener('click', onMessageClick.bind(this));
		}
	}
};