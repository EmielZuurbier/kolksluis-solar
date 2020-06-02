
/**
 * Track the cursor element with the cursor.
 * 
 * @param 	{Event} event 
 * @returns	{void}
 */
export const onMouseMove = function onMouseMove({ pageX, pageY }) {
	requestAnimationFrame(() => {
		x = pageX - (this.offsetWidth / 2);
		y = pageY - (this.offsetHeight / 2);
		this.style.transform = `translate3d(${x}px, ${y}px, 0)`;
	});
};

/**
 * 
 * 
 * @param {*} event 
 */
export const onWheel = function onWheel(event) {

};