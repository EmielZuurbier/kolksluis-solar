
/**
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange({ target }) {
	const { name } = target;
	const elements = target.assignedElements();

	if (name === 'center') {
		for (const element of elements) {
			element.addEventListener('click', () => {
				const center = this.center;
				if (center !== null) {
					this.toCenter(center);
				}
			})
		}
	} else if (name === 'zoom-in') {
		for (const element of elements) {
			element.addEventListener('click', () => {
				this.zoom += 1; 
			})
		}
	} else if (name === 'zoom-out') {
		for (const element of elements) {
			element.addEventListener('click', () => {
				this.zoom -= 1;
			})
		}
	}
}