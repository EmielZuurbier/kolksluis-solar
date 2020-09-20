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
 * @param 		{string} [resource=wp.ajax] The URL to fetch from.
 * @returns		{Promise} Returns a promise with a string on resolve.
 */
export const postFormData = async (data, resource = wp.ajax) => {

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