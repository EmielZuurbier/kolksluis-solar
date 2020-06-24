export default class Time {
	
	/**
	 * Convert a timestamp into the amount of seconds.
	 * 
	 * @static
	 * @method		timeToSeconds
	 * @param 		{number} date A date timestamp. 
	 * @returns		{number}
	 */
	static timeToSeconds = date => Math.round(date / 1000);

	/**
	 * Convert a timestamp into the amount of minutes.
	 * 
	 * @static
	 * @method		timeToMinutes
	 * @param 		{number} date A date timestamp. 
	 * @returns		{number}
	 */
	static timeToMinutes = date => Math.round(timeToSeconds(date) / 60);

	/**
	 * Convert a timestamp into the amount of hours.
	 * 
	 * @static
	 * @method		timeToHours
	 * @param 		{number} date A date timestamp. 
	 * @returns		{number}
	 */
	static timeToHours = date => Math.round(timeToMinutes(date) / 60);

	/**
	 * Convert a timestamp into the amount of days.
	 * 
	 * @static
	 * @method		timeToDays
	 * @param 		{number} date A date timestamp. 
	 * @returns		{number}
	 */
	static timeToDays = date => Math.round(timeToHours(date) / 24);

}