/**
 * @module      ./utilities/fetch
 */

/**
 * @function	isResponseOk
 * @param 		{Response} response 
 * @returns		{boolean}
 */
export const isResponseOk = response => response.ok === true;

/**
 * @function    isInformationalResponse
 * @param       {Response} response 
 * @returns     {boolean}
 */
export const isInformationalResponse = response => response.status >= 100 && response.status <= 199;

/**
 * @function    isSuccessResponse
 * @param       {Response} response 
 * @returns     {boolean}
 */
export const isSuccessResponse = response => response.status >= 200 && response.status <= 299;

/**
 * @function    isRedirectResponse
 * @param       {Response} response 
 * @returns     {boolean}
 */
export const isRedirectResponse = response => response.status >= 300 && response.status <= 399;

/**
 * @function    isClientErrorResponse
 * @param       {Response} response 
 * @returns     {boolean}
 */
export const isClientErrorResponse = response => response.status >= 400 && response.status <= 499;

/**
 * @function    isServerErrorResponse
 * @param       {Response} response 
 * @returns     {boolean}
 */
export const isServerErrorResponse = response => response.status >= 500 && response.status <= 599;

/**
 * @function    getErrorMessage
 * @param       {Response} response 
 * @returns     {string}
 */
export const getErrorMessage = response => `${response.status}: ${response.statusText}`;

/**
 * Uses a generator to create an async iterable function
 * to make the fetch requests execute one after another.
 * 
 * @function	fetchIterator
 * @param 		{string[]} resources An array of URL's to fetch
 * @param		{Object} init Init object of the fetch API.
 * @returns		{GeneratorFunction}
 */
export async function* fetchIterator(resources, init = {}) {
    for (const resource of resources) {
		const response = await fetch(resource, init);
        yield response;
    }
}

/**
 * Fetches posts based on a FormData instance containing the parameters
 * for retrieving the posts of choice from the admin-ajax.php template.
 * 
 * @function	postFormData
 * @param 		{FormData} data A FormData instance with data for the request.
 * @param 		{string} [resource=__wp__.ajax] The URL to fetch from.
 * @returns		{Promise} Returns a promise with a string on resolve.
 */
export const postFormData = async (data, resource = __wp__.ajax) => {

	// Stop the function if no FormData instance is given.
	if (typeof data === 'undefined' || !(data instanceof FormData)) {
		throw new Error('data parameter is not an instance of FormData');
	}

	// Create a new URL instance.
	const url = new URL(resource);
	const action = data.get('action');
	url.searchParams.set('action', action);

	// Set the body to the options.
	const options = {
		method: 'POST',
		body: data
	};

	// Fetch the request.
	const response = await fetch(url, options);

	// If response succeeds return the json.
	if (isResponseOk(response)) {
		const json = await response.json();
		return json;
	}

	// Return the error.
	const error = new Error(response.statusText);
	error.response = response;
	throw error;

};

/**
 * Makes sure that when called multiple times in a short span of time
 * that the previous request will be aborted and a new request will
 * begin. This way there is always one request going out, but it does
 * not guarantee that the server is already reached and is creating a
 * response.
 * 
 * Call the function first and store the result. This is now your wrapper
 * around a fetch request.
 * 
 * @function  	createThrottledFetch
 * @returns		{Function}
 * 
 * @example
 * const throttledFetch = createThrottledFetch();
 * const response = await throttledFetch(url, {
 *   method: 'POST',
 *   body: body
 * });
 */
export const createThrottledFetch = () => {
	let controller = null;

	return (url, options) => {
		if (controller) {
			controller.abort();
		}

		controller = new AbortController();
		const { signal } = controller;

		return fetch(url, {
			...options,
			signal,
		})
		.then((response) => {
			controller = null;
			return response;
		})
		.catch(({ name, message }) => {
			if (name === 'AbortError') {
				console.debug(
					`%c throttledFetch message:\n %cCurrent request has been aborted. Starting new request.`,
					'font-weight: bold; border-left: 3px solid #8bc34a;', 
					'color: #a0a0a0;'
				);
			} else {
				console.debug(
					`%c throttledFetch message:\n %c${name}: ${message}.`,
					'font-weight: bold; border-left: 3px solid #ff5722', 
					'color: #a0a0a0;'
				);
			}
		});
	}
}