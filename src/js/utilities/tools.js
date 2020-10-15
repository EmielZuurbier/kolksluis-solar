/**
 * @module		./utilities/tools
 */

/**
 * Returns a function, that, as long as it continues to be invoked, will not 
 * be triggered. The function will be called after it stops being called for 
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * 
 * @function	debounce
 * @param   	{Function} callback Function to execute.
 * @param   	{number} wait Time to wait before firing in milliseconds.
 * @param   	{boolean} [immediate=false] Fire immediately or not.
 * @returns		{Function} Closure function.
 */
export const debounce = (callback, wait, immediate = false) => {
	let timeout;
	return (...args) => {
		const later = () => {
			timeout = null;
			if (!immediate) callback(...args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) callback(...args);
	};
};

/**
 * Memoization function. It executes the callback and stores the result in 
 * a cache instance. When the the callback is called again with the same
 * arguments, the memo function will check the cache and see if the result
 * is already there. If so the result will be returned and else it will
 * execute the callback and store the result. 
 * 
 * @function	memo
 * @param 		{Function} callback The function to execute and store the result from.
 * @returns		{Function} Function that checks if the result is already stored and returns the result.
 * 
 * In this example we create a function called add with the memo function.
 * Now every time we call add, it will remember what numbers are used for a & b.
 * When the same numbers are used a second time, the result will not have to
 * be calculated, but can be retrieved from memory. Which is much faster.
 * 
 * @example		const add = memo((a, b) => a + b);
 */
export const memo = callback => {
	const cache = new Map();
	return (...args) => {
		const selector = JSON.stringify(args);
		if (cache.has(selector)) return cache.get(selector);
		const value = callback(...args);
		cache.set(selector, value);
		return value;
	};
};

/**
 * Returns a Promise which will wait for N seconds.
 * 
 * @function	sleep
 * @param 		{number} wait Milliseconds to wait.
 * @returns		{Promise}
 */
export const sleep = wait => new Promise(resolve => { 
	setTimeout(resolve, wait);
});

/**
 * Converts the keys of an object to a new format.
 * 
 * @function	convertKeysOfObject
 * @param 		{Object} object Object to convert.
 * @param		{Function} converterCallback The converter function that converts each key.
 * @returns		{Object}
 */
export const convertKeysOfObject = (object, converterCallback) => {
	const keys = Object.keys(object);
	keys.forEach((key) => {
		const convertedKey = converterCallback(key);
		if (convertedKey !== key) {
			Object.defineProperty(
				object, 
				convertedKey,
				Object.getOwnPropertyDescriptor(object, key)
			);
			delete object[key];
		}
	});
	return object;
};

/**
 * Generates a random number between a min and a max value.
 * 
 * @function	getRandomInt
 * @param   	{number} min Min value.
 * @param   	{number} max Max value.
 * @returns 	{number} Random number.
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Returns an array of numbers that are in a string.
 * 
 * @function	getNumbersFromString
 * @param 		{string} string String to search in.
 * @returns		{number[]} Array for numbers. 
 */
export const getNumbersFromString = string => string.match(/\d+/g).map(match => Number(match))

/**
 * Returns a given number squared.
 * 
 * @function	numberSquared
 * @param 		{number} number Number to square
 * @returns		{number} Squared number
 */
export const numberSquared = number => number ** 2;

/**
 * Converts a number to a radius.
 * Returns the number multiplied by PI divided by 180.
 * 
 * @function	numberToRadius
 * @param 		{number} number Number to convert.
 * @returns		{number} Number as radius.
 */
export const numberToRadius = number => number * Math.PI / 180;

/**
 * Converts a number to a degree.
 * Returns the number multiplied by 180 divided by PI.
 * 
 * @function	numberToRadius
 * @param 		{number} number Number to convert.
 * @returns		{number} Number in degree.
 */
export const numberToDegree = number => number * 180 / Math.PI;

/**
 * Checks if a number is between two numbers. 
 * Returns a true or false value.
 * 
 * @function	isIndexBetween
 * @param 		{number} index Number to compare.
 * @param 		{number} from More than and equal number.
 * @param 		{number} to Less than number.
 * @returns		{boolean}
 */
export const isIndexBetween = (index, from, to) => from <= index && index < to;

/**
 * Checks if given value is an instance of an HTMLElement.
 * 
 * @param 		{any} value 
 * @returns		{boolean}
 */
export const isHTMLElement = value => value instanceof HTMLElement;

/**
 * Check if screen is a mobile display.
 * 
 * @function	isMobileWidth
 * @returns		{boolean}
 */
export const isMobileWidth = () => window.innerWidth < 768;

/**
 * Check if screen is a tablet display.
 * 
 * @function	isTabletWidth
 * @returns		{boolean}
 */
export const isTabletWidth = () => window.innerWidth >= 768 && window.innerWidth <= 1280;

/**
 * Check if screen is a laptop display.
 * 
 * @function	isLaptopWidth
 * @returns		{boolean}
 */
export const isLaptopWidth = () => window.innerWidth >= 1280 && window.innerWidth <= 1920;

/**
 * Check if device has touch capabilities.
 * 
 * @function	isTouchDevice
 * @returns		{boolean}
 */
export const isTouchDevice = () => ('ontouchstart' in document.documentElement);

/**
 * Converts the comma's in a string to dots.
 * 
 * @function	stringCommaToDot
 * @param   	{string} string String with comma's.
 * @returns 	{string} Modified string with dots instead of comma's.
 */
export const stringCommaToDot = string => string.replace(/,/g, '.');

/**
 * Converts the comma's in a string to dots.
 * 
 * @function	stringDotToComma
 * @param   	{string} string String with dots.
 * @returns 	{string} Modified string with comma's instead of dots.
 */
export const stringDotToComma = string => string.replace(/./g, ',');

/**
 * Converts a camel-cased string to a snake-cased string and returns it.
 * 
 * @function	stringCamelToSnake
 * @param 		{string} string 
 * @returns		{string}
 */
export const stringCamelToSnake = string => string.replace(/[A-Z\s]+/g, match => `_${match.toLowerCase()}`);

/**
 * Converts a snake-cased string to a camel-cased string and returns it.
 * 
 * @function	stringSnakeToCamel
 * @param 		{string} string 
 * @returns		{string}
 */
export const stringSnakeToCamel = string => string.replace(/_\w/g, match => match[1].toUpperCase());

/**
 * @function	stringContainsLowerCase
 * @param 		{string} string 
 * @returns		{boolean}
 */
export const stringContainsLowerCase = string => string.toUpperCase() !== string;

/**
 * @function	stringContainsUpperCase
 * @param 		{string} string 
 * @returns		{boolean}
 */
export const stringContainsUpperCase = string => string.toLowerCase() !== string;

/**
 * Generates a random alphanumeric string based on a given length and returns it.
 * 
 * @function	generateAlphaNumericString
 * @param 		{number} [length=10] 
 * @returns		{string}
 */
export const generateAlphaNumericString = (length = 10) => {
	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const setLength = charset.length;
	let value = '';
	let i = 0;
	for (i; i < length; i++) {
		value += charset.charAt(Math.floor(Math.random() * setLength));
	}
	return value;
};


/**
 * Generates a unique UUID that --almost-- guarantees that the value is unique.
 * 
 * @function	uuid
 * @returns		{string}
 */
export const uuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

/**
 * Converts an array into a comma seperated value (CSV) string.
 * 
 * @function	arrayToCSV
 * @param		{Array} data Array to convert to CSV string.
 * @returns		{(string|Array)} Original data or CSV string.
 */
export const arrayToCSV = (data = []) => {
	if (!Array.isArray(data)) return data;
	const csvString = data.join(',');
	return csvString;
};

/**
 * Converts an object into a comma seperated value (CSV) string.
 * 
 * @function	objectToCSV
 * @param 		{Object} data Object to convert to CSV string.
 * @returns		{(string|Object)}	Original data or CSV string.
 */
export const objectToCSV = (data = {}) => {
	if ('object' !== typeof data) return data;
	const keys = Object.keys(data);
	const csvString = keys.map(key => `${key}=${data[key]}`).join(',');
	return csvString;
};

/**
 * Converts the keys of an object to snake-cased format.
 * This is useful to create PHP friendly keys to use in a queriable string format.
 * 
 * @function	keysOfObjectToSnakeCase
 * @uses		stringCamelToSnake()
 * @param 		{Object} object
 * @returns		{Object}
 */
export const keysOfObjectToSnakeCase = object => convertKeysOfObject(object, stringCamelToSnake); 

/**
 * Converts the keys of an object to camel-cased format.
 * This is useful for creating a JS friendly object coming from a PHP object or associative array.
 * 
 * @function	keysOfObjectToCamelCase
 * @uses		stringSnakeToCamel()
 * @param 		{Object} object
 * @returns		{Object}
 */
export const keysOfObjectToCamelCase = object => convertKeysOfObject(object, stringSnakeToCamel); 

/**
 * Converts an array with strings into a string that can be used in a query.
 * 
 * @function	serializeArray
 * @uses		arrayToCSV()
 * @param   	{string} key The name of the values.
 * @param		{string[]} data The values in a array format with strings.
 * @param		{Boolean} question Append a questionmark before the string.
 * @returns 	{string} Queryable string.
 * 
 * @example
 * const key = 'post_type';
 * const data = ['post', 'page']
 * 
 * const query = serializeArray(key, data, true); // = "?post_type[]=post&post_type[]=page"
 */
export const serializeArray = (key, data = [], question = false) => {
	if (!Array.isArray(data)) throw new Error('data argument is not given or type of array');
	const query = data.map(value => `${encodeURIComponent(`${key}[]`)}=${encodeURIComponent(value)}`).join('&');
	return question === true ? `?${query}` : query;
};

/**
 * Converts an object with keys and values into a string that can 
 * be used as a querieable string.
 * 
 * @function	serializeObject
 * @uses		serializeArray()
 * @param 		{Object} data Object to convert to string.
 * @param		{Boolean} question Append a questionmark before the string.
 * @returns		{string} Queryable string.
 * 
 * @example
 * const data = {
 *      action: 'get_posts',
 *      post_type: ['post', 'page'],
 * 		post_status: ['publish']
 * };
 * 
 * const query = serializeObject(data, true); // = "?action=value&post_type[]=post&post_type[]=page&post_status[]=publish"
 */
export const serializeObject = (data = {}, question = false) => {
	if (!data || 'object' !== typeof data) throw new Error('data argument is not given or type of object');
	const keys = Object.keys(data);
	const query = keys.map(key => Array.isArray(data[key]) ? serializeArray(key, data[key]) : `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
	return question === true ? `?${query}` : query;
};

/**
 * Creates a string which can be used as the search property of an URL object.
 * 
 * @function    createQueryableURIString
 * @uses        serializeObject
 * @uses        keysOfObjectToSnakeCase
 * @param       {Object} data Object to convert to snake_case and to serialize into a single string.
 * @returns     {string} String that can be queried in an URL.
 */
export const createQueryableURIString = data => serializeObject(keysOfObjectToSnakeCase(data), false);

/**
 * Checks if location.search includes a specific string.
 * 
 * @function	includesURLQueryString
 * @param		{string} searchString
 * @returns		{boolean}
 */
export const includesURLQueryString = searchString => location.search.includes(searchString);

/**
 * Shuffles an array in a random order and returns the shuffled array. 
 * 
 * @function	shuffleArray
 * @param 		{Array} array Array that has to be shuffled.
 * @returns		{Array} The shuffled array.
 */
export const shuffleArray = array => {
	for (let index = array.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
    return array;
}

/**
 * Deepens an array be dividing it into smaller array chunks.
 * 
 * @function
 * @param 	{array} array The array to divide in chunks.
 * @param 	{number} size The size of each chunk.
 * @returns	{array}
 */
export const arrayChunks = (array, size) => Array(Math.ceil(array.length / size)).fill()
	.map((entry, index) => index * size)
	.map(begin => array.slice(begin, begin + size));

/**
 * Replaces only the last occurance of a string in a given string.
 * 
 * @function	replaceLastStringOccurence
 * @param 		{string} source String to modify.
 * @param 		{string} target Character to replacement.
 * @param 		{string} replacement Replacement string.
 * @returns		{string} Modified string.
 */
export const replaceLastStringOccurence = (source = '', target = '', replacement = '') => {
	const array = source.split('');
	array[source.lastIndexOf(target)] = replacement;
	return array.join("");
};

/**
 * Checks if the browser supports a property.
 * Returns a boolean
 *
 * @function	cssPropertyValueSupported
 * @param		{string} property Property to evaluate.
 * @param		{string} value Value of property to check.
 * @returns		{boolean}
 */
export const cssPropertyValueSupported = (property, value) => {
    const div = document.createElement('div');
    div.style[property] = value;
    return div.style[property] === value;
};

/**
 * Select all the a tags with an rel="external" attribute and set 
 * the target attribute to '_blank'. This makes sure that all
 * theses links will open in a new tab.
 *
 * @function	externalLinksTargetBlank
 * @param   	{string} [query=a[rel="external"]] Query to get the external links.
 * @returns		{Array}
 */
export const externalLinksTargetBlank = (query = 'a[rel="external"]') => {
    let links = document.querySelectorAll(query);
    return [...links].map(link => link.setAttribute('target', '_blank'));
};

/**
 * Checks if a feature is supported and returns a boolean.
 * 
 * @function	hasFeatures
 * @param 		{string[]} feature Feature to check.
 * @returns		{boolean}
 */
export const hasFeatures = (...features) =>
	features.every(feature => {

		// If feature is not a string.
		if (typeof feature !== 'string') {
			return false;
		}

		// Convert string to lowercase and remove spaces.
		const query = feature.toLocaleLowerCase().replace(/ /g, '');

		// Check the queried feature.
		switch(query) {
			case 'promise':
			case 'promises':
				return (typeof Promise === 'undefined' || Promise.toString().indexOf('[native code]') === -1);
			case 'intersectionobserver':
				return ('IntersectionObserver' in window);
			case 'mutationobserver':
				return ('MutationObserver' in window);
			case 'resizeobserver':
				return ('ResizeObserver' in window);
			case 'customelements':
				return ('customElements' in window);
			case 'customevent':
				return ('CustomEvent' in window);
			case 'pushstate':
				return ('pushState' in history);
			case 'serviceworker':
				return ('serviceWorker' in navigator);
			case 'webworker':
				return ('webworker' in window);
			case 'audiocontext':
			case 'webaudioapi':
				return ('AudioContext' in window || 'webkitAudioContext' in window);
			case 'animate':
			case 'webanimationapi':
				return ('animate' in document.body);
			case 'animation':
				return ('Animation' in window);
			case 'keyframeeffect':
				return ('KeyframeEffect' in window);
			case 'localstorage':
				return ('localStorage' in window);
			case 'sessionstorage':
				return ('sessionStorage' in window);
			case 'layoutworklet':
			case 'layoutapi':
				return ('layoutWorklet' in CSS);
			case 'paintworklet':
			case 'paintapi':
				return ('paintWorklet' in CSS);
			case 'animationworklet':
			case 'animationapi':
				return ('animationWorklet' in CSS);
			case 'customproperties':
			case 'registerproperty':
				return ('registerProperty' in CSS);
			case 'scrollbehavior':
				return ('scrollBehavior' in document.documentElement.style);
			case 'passiveevents':
				let supportsPassive = false;
				try {
					let options = Object.defineProperty({}, 'passive', {
						get: function() {
							supportsPassive = true;
						}
					});
					window.addEventListener('testPassive', null, options);
					window.removeEventListener('testPassive', null, options);
				} catch (e) {}
				return supportsPassive;
			default:
				return false;
		}

	});