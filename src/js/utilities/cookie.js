/**
 * @module		./utilities/cookie
 */

/**
 * Retrieves a cookie from the document.
 * Returns a string if the cookie is found or false when it is not.
 *
 * @function  	getCookie
 * @returns 	{(string|null)} Returns cookie on success, null on fail.
 */
export const getCookie = name => {
	const nameExpression = `${name}=`;
	const cookies = document.cookie.split(';');
	const cookie = cookies.find(currentCookie => currentCookie.includes(nameExpression));
	if (cookie) return cookie.substring(nameExpression.length, cookie.length);
	return null;
}

/**
 * Creates cookie with a name, value, expire date, path and a domain.
 * Returns the cookie of the document.
 *
 * @function  	setCookie
 * @param		{string} name Name of cookie
 * @param 		{string} value Value of cookie
 * @param 		{number} [expire] When cookie expires in days
 * @param 		{string} [path] Path to store cookie
 * @param   	{string} [domain] The domain to store the cookie
 * @returns 	{string} Returns the cookie string
 */
export const setCookie = (name, value, expire = 365, path = '/', domain = location.hostname.replace(/^www\./i, '')) => {
	const date = new Date();
	date.setTime(date.getTime() + (expire * 24 * 3600 * 1000));
	const expires = date.toUTCString();
	document.cookie = `${name}=${value}; expires=${expires}; path=${path}; domain=${domain}`;
	return document.cookie;
}

/**
 * Checks if the cookie exists in thedocument.cookie string. 
 * Returns a boolean.
 * 
 * @function    hasCookie
 * @param 		{string} name Name of cookie to look for
 * @returns     {boolean}
 */
export const hasCookie = name => document.cookie.split(';').some(cookie => cookie.includes(name));

/**
 * Deletes cookie from the document.
 *
 * @function	deleteCookie
 * @returns     {string} Returns the cookie
 */
export const deleteCookie = name => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
	return document.cookie;
};