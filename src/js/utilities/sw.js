/**
 * @module		./utilities/sw
 * 
 * When an error occures saying that the scope of the 
 * service worker could not be set because of missing headers,
 * paste this in the .htaccess file.
 * 
 	<Files "serviceworker.js">
		Header Set Service-Worker-allowed "/"
	</Files>
 * 
 * This will give the .htaccess the proper access
 * to the scope of the service worker.
 */

import { hasFeatures } from './tools';

/**
 * Checks if the service worker feature
 * is supported by the current browser.
 * 
 * @typedef	supportsServiceWorker
 * @type	{Boolean}
 */
export const supportsServiceWorker = hasFeatures('Service Worker');

/**
 * Prints a succes message in the console
 * after registering a service worker.
 * 
 * @function	registrationSucces
 * @param		{ServiceWorkerRegistration} registration
 * @returns		{void}
 */
const registrationSucces = (registration) => {
	console.info('Service worker registration succeeded:', registration);
}

/**
 * Prints a error message in the console
 * after registering a service worker.
 * 
 * @function	registrationError
 * @param		{Error} error
 * @returns		{void}
 */
const registrationError = (error) => {
	console.error('Service worker registration failed:', error);
}

/**
 * Registers the Service Worker when the page has loaded.
 * Checks for support before running the function.
 * 
 * @param 	{String} scriptURL The URL of the service worker script.
 * @param	{Object} options An object containing registration options.
 * @param	{String} options.scope A USVString representing a URL that defines a service worker's registration scope.
 * @returns	{void}
 */
export const registerServiceWorker = (scriptURL, options = {scope: '/wp-content/'}) => {
	if (supportsServiceWorker) {
		return navigator.serviceWorker.register(scriptURL, options)
			.then(registrationSucces)
			.catch(registrationError);
	}
};