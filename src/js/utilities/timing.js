/**
 * @module		./utilities/timing
 */

/**
 * Converts a timing function to
 * an ease-out curve.
 * 
 * @function	makeEaseOut
 * @param		{Function} timing A timing function that creates an ease.
 * @returns		{Function}
 */
export const makeEaseOut = (timing) => 
	(timeFraction) =>  
		- timing(1 - timeFraction);

/**
 * Converts a timing function to
 * an ease-in-out curve.
 * 
 * @function	makeEaseInOut
 * @param		{Function} timing A timing function that creates an ease.
 * @returns		{Function}
 */
export const makeEaseInOut = (timing) =>
	(timeFraction) => 
	  	(timeFraction < .5) ?
			timing(2 * timeFraction) / 2 :
			(2 - timing(2 * (1 - timeFraction))) / 2;

/**
 * Creates a linear curve.
 * 
 * @function	linear
 * @param 		{Number} timeFraction 
 * @returns		{Number}
 */
export const linear = (timeFraction) =>
	timeFraction;

/**
 * Creates an exponential increasing curve.
 * 
 * @function	quad
 * @param 		{Number} timeFraction 
 * @returns		{Number}
 */
export const quad = (timeFraction) => 
	timeFraction * timeFraction;

/**
 * Creates a circular curve.
 * 
 * @function	
 * @param		{Number} timeFraction
 * @returns		{Number}
 */
export const circ = (timeFraction) =>
	1 - Math.sin(Math.acos(timeFraction));

/**
 * Creates a bounce curve.
 * 
 * @function	
 * @param		{Number} timeFraction
 * @returns		{Number}
 */
export const bounce = (timeFraction) => {
	for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
		if (timeFraction >= (7 - 4 * a) / 11) {
			return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
		}
	}
};

/**
 * Creates an elastic curve.
 * 
 * @function	elastic
 * @param 		{Number} factor 
 * @param 		{Number} timeFraction 
 * @returns		{Number}
 */
export const elastic = (factor, timeFraction) =>
	Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * factor / 3 * timeFraction);