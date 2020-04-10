/**
 * @module      ./utilities/fetch
 */

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