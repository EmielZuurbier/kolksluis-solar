/**
 * @module		./components/slider/functions
 */

/**
 * Returns the offset position of the rails.
 * 
 * @function  	getRailsOffset
 * @returns		{Object} Height and width times the index.
 */
export const getRailsOffset = function getRailsOffset() {
	return {
		x: (this.rails.offsetWidth / this.amount) * this.index,
		y: (this.rails.offsetHeight / this.amount) * this.index
	};
};

/**
 * @typedef		directionsObject
 * @type 		{Object} obj
 * @param		{string} horizontal  
 * @param		{string} vertical
 */

 /**
 * Creates a new object with a horizontal and a vertical value
 * 
 * @function	createDirections
 * @param 		{*} horizontal The horzontal value.
 * @param		{*} vertical The vertical value. 
 * @param		{Function} callback Function to run over the horizontal and vertical value. Must return a value.
 * @returns		{(directionsObject|null)}
 */
export const createDirections = (horizontal, vertical, callback = (value) => value) => 
	(horizontal !== undefined || vertical !== undefined || 'function' === typeof callback) ? 
		({ horizontal: callback(horizontal),vertical: callback(vertical) }) : 
		null;

/**
 * @function	getEventScreenValues
 * @param 		{Event} event 
 * @returns		{Object}
 */
export const getEventScreenValues = ({ screenX, screenY }) => ({ x: screenX, y: screenY });