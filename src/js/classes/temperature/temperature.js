export default class Temperature {

	/**
	 * Convert a Fahrenheit temperature to Celcius.
	 * 
	 * @static
	 * @method		fahrenheitToCelcius
	 * @param		{number} temp The temperature value to convert.
	 * @returns		{number} The converted value.
	 */
	static fahrenheitToCelcius = temp => (temp - 32) / 1.8;

	/**
	 * Convert a Fahrenheit temperature to Kelvin.
	 * 
	 * @static
	 * @method		fahrenheitToKelvin
	 * @param		{number} temp The temperature value to convert.
	 * @returns		{number} The converted value.
	 */
	static fahrenheitToKelvin = temp => Temperature.fahrenheitToCelcius(temp) + 273.15;

	/**
	 * Convert a Celcius temperature to Fahrenheit.
	 * 
	 * @static
	 * @method		celciusToFahrenheit
	 * @param		{number} temp The temperature value to convert.
	 * @returns		{number} The converted value.
	 */
	static celciusToFahrenheit = temp => (temp * 1.8) + 32;

	/**
	 * Convert a Celcius temperature to Kelvin.
	 * 
	 * @static
	 * @method		celciusToKelvin
	 * @param		{number} temp The temperature value to convert.
	 * @returns		{number} The converted value.
	 */
	static celciusToKelvin = temp => temp + 273.15;

	/**
	 * Convert a Kelvin temperature to Celcius.
	 * 
	 * @static
	 * @method		kelvinToCelcius
	 * @param		{number} temp The temperature value to convert.
	 * @returns		{number} The converted value.
	 */
	static kelvinToCelcius = temp => temp - 273.15;

	/**
	 * Convert a Kelvin temperature to Fahrenheit.
	 * 
	 * @static
	 * @method		kelvinToFahrenheit
	 * @param		{number} temp The temperature value to convert.
	 * @returns		{number} The converted value.
	 */
	static kelvinToFahrenheit = temp => Temperature.celciusToFahrenheit(
		Temperature.kelvinToCelcius(temp)
	);

}