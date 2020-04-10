/**
 * @module      ./utilities/rest
 */

import { 
	isSuccessResponse,
	getErrorMessage
} from './fetch.js';
import { createQueryableURIString } from './tools.js';

/**
 * Function to get data from the WordPress REST API. Takes a number of arguments to specify
 * which data to get. The data is processed to a querieable snakecased string and sent to 
 * the API. If the request is successful it returns a Promse in a JSON format.
 * 
 * @function    getRestData
 * @param	    {string} [route='/wp/v2/posts'] The default route of getting results.
 * @param	    {Object} args Arguments to limit results to the specificity of the query.
 * @param	    {string} [rest=wp.rest] Url of REST API.
 * @returns	    {Promise}
 */
export const getRestData = async (route = '/wp/v2/posts', args = {}, rest = wp.rest) => {

	// Check if args parameter is set and if it is an object.
	if ('object' !== typeof args) throw new Error('Args not set or not an object');

	// Create endpoint with arguments for request.
	const url = new URL(`${rest}${route}`);
	url.search = createQueryableURIString(args);

	// Fetch the request.
	const response = await fetch(url, {
		method: 'GET',
		headers: headers,
		mode: 'same-origin',
		cache: 'default',
	});

	// If response succeeds return the json.
	if (isSuccessResponse(response)) {
		const json = await response.json();
		return json;
	}

	// Output error.
	const errorMessage = getErrorMessage(response);
	throw new Error(errorMessage);

};

/**
 * Fetches the posts of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the posts in JSON format.
 * 
 * @function    getPosts
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(string|number)} [args.page=1] Current page of the collection.
 * @param	    {(string|number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {string} args.search Limit results to those matching a string.
 * @param	    {string} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	    {string} args.author Limit result set to posts assigned to specific authors.
 * @param	    {string} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	    {string} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	    {string} args.exclude Ensure result set excludes specific IDs.
 * @param	    {string} args.include Limit result set to specific IDs.
 * @param	    {(string|number)} args.offset Offset the result set by a specific number of items.
 * @param	    {string} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {string} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {string} args.slug Limit result set to posts with one or more specific slugs.
 * @param	    {string} [args.status='publish'] Limit result set to posts assigned one or more statuses.
 * @param	    {string} args.categories Limit result set to all items that have the specified term assigned in the categories taxonomy.
 * @param	    {string} args.categoriesExclude Limit result set to all items except those that have the specified term assigned in the categories taxonomy.
 * @param	    {string} args.tags Limit result set to all items that have the specified term assigned in the tags taxonomy.
 * @param	    {string} args.tagsExclude Limit result set to all items except those that have the specified term assigned in the tags taxonomy.
 * @param	    {string} args.sticky Limit result set to items that are sticky.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getPosts({
 * 	perPage: 4,
 * 	offset: 1,
 * 	orderby: 'menu_order',
 * 	order: 'desc'
 * }).then((posts) => {
 *   	// Do something with posts.
 * });
 */
export const getPosts = async (args = {}) => {
	const route = 'wp/v2/posts/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches a single post based on the given id.
 * It will return a Promise containing either an error or the post in JSON format.
 * 
 * @function    getPost
 * @param       {number} id 
 * @param       {Object} args
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {string} args.password The password for the post if it is password protected.
 * @returns     {Promise<JSON>}
 */
export const getPost = async (id = 0, args = {}) => {
	if ('number' !== typeof id) throw new Error('id parameter needs to be a number.');
    const route = `wp/v2/posts/${id}`;
    const response = await getRestData(route, args);
	return response;
}

/**
 * Fetches the categories of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the categories.
 * 
 * @function    getCategories
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(string|number)} [args.page=1] Current page of the collection.
 * @param	    {(string|number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {string} args.search Limit results to those matching a string.
 * @param	    {string} args.exclude Ensure result set excludes specific IDs.
 * @param	    {string} args.include Limit result set to specific IDs.
 * @param	    {string} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {string} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {(Boolean|number)} args.hideEmpty Whether to hide terms not assigned to any posts.
 * @param	    {(string|number)} args.parent Limit result set to terms assigned to a specific parent.
 * @param	    {(string|number)} args.post Limit result set to terms assigned to a specific post.
 * @param	    {string} args.slug Limit result set to posts with one or more specific slugs.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getCategories().then((categories) => {
 *      // Do something with categories.
 * });
 */
export const getCategories = async (args = {}) => {
	const route = 'wp/v2/categories/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches a single category based on the given id.
 * It will return a Promise containing either an error or the category in JSON format.
 * 
 * @function    getCategory
 * @param       {number} id 
 * @param       {Object} args
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @returns     {Promise<JSON>}
 */
export const getCategory = async (id = 0, args = {}) => {
	if ('number' !== typeof id) throw new Error('id parameter needs to be a number.');
    const route = `wp/v2/categories/${id}`;
    const response = await getRestData(route, args);
	return response;
}

/**
 * Fetches the tags of this WordPress site hrough the REST API. The function is an async
 * function which will return a Promise containing either an error or the tags.
 * 
 * @function    getTags
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(string|number)} [args.page=1] Current page of the collection.
 * @param	    {(string|number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {string} args.search Limit results to those matching a string.
 * @param	    {string} args.exclude Ensure result set excludes specific IDs.
 * @param	    {string} args.include Limit result set to specific IDs.
 * @param	    {string} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {string} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {Boolean} args.hideEmpty Whether to hide terms not assigned to any posts.
 * @param	    {string} args.parent Limit result set to terms assigned to a specific parent.
 * @param	    {string} args.post Limit result set to terms assigned to a specific post.
 * @param	    {string} args.slug Limit result set to posts with one or more specific slugs.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getTags().then((tags) => {
 *      // Do something with tags.
 * });
 */
export const getTags = async (args = {}) => {
	const route = 'wp/v2/tags/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches a single tag based on the given id.
 * It will return a Promise containing either an error or the tag in JSON format.
 * 
 * @function    getTag
 * @param       {number} id 
 * @param       {Object} args
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @returns     {Promise<JSON>}
 */
export const getTag = async (id = 0, args = {}) => {
	if ('number' !== typeof id) throw new Error('id parameter needs to be a number.');
    const route = `wp/v2/tags/${id}`;
    const response = await getRestData(route, args);
	return response;
}

/**
 * Fetches the pages of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the pages.
 * 
 * @function    getPages
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(string|number)} [args.page=1] Current page of the collection.
 * @param	    {(string|number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {string} args.search Limit results to those matching a string.
 * @param	    {string} args.after Limit response to pages published after a given ISO8601 compliant date.
 * @param	    {string} args.author Limit result set to pages assigned to specific authors.
 * @param	    {string} args.authorExclude Ensure result set excludes pages assigned to specific authors.
 * @param	    {string} args.before Limit response to pages published before a given ISO8601 compliant date.
 * @param	    {string} args.exclude Ensure result set excludes specific IDs.
 * @param	    {string} args.include Limit result set to specific IDs.
 * @param	    {string} args.menuOrder Limit result set to pages with a specific menu_order value.
 * @param	    {(string|number)} args.offset Offset the result set by a specific number of items.
 * @param	    {string} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {string} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {string} args.parent Limit result set to items with particular parent IDs.
 * @param	    {string} args.parent_exclude Limit result set to all items except those of a particular parent ID.
 * @param	    {string} args.slug Limit result set to pages with one or more specific slugs.
 * @param	    {string} [args.status='publish'] Limit result set to pages assigned one or more statuses.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getPages().then((pages) => {
 * 		// Do something with pages.
 * });
 */
export const getPages = async (args = {}) => {
	const route = 'wp/v2/pages/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches a single page based on the given id.
 * It will return a Promise containing either an error or the page in JSON format.
 * 
 * @function    getPage
 * @param       {number} id 
 * @param       {Object} args
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {string} args.password The password for the page if it is password protected.
 * @returns     {Promise<JSON>}
 */
export const getPage = async (id = 0, args = {}) => {
	if ('number' !== typeof id) throw new Error('id parameter needs to be a number.');
    const route = `wp/v2/pages/${id}`;
    const response = await getRestData(route, args);
	return response;
}

/**
 * Fetches the pages of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the comments.
 * 
 * @function    getComments
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(string|number)} [args.page=1] Current page of the collection.
 * @param	    {(string|number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {string} args.search Limit results to those matching a string.
 * @param	    {string} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	    {string} args.author Limit result set to posts assigned to specific authors.
 * @param	    {string} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	    {string} args.authorEmail Limit result set to that from a specific author email. Requires authorization.
 * @param	    {string} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	    {string} args.exclude Ensure result set excludes specific IDs.
 * @param	    {string} args.include Limit result set to specific IDs.
 * @param	    {string} args.menuOrder Limit result set to posts with a specific menu_order value.
 * @param	    {(string|number)} args.offset Offset the result set by a specific number of items.
 * @param	    {string} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {string} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {string} args.parent Limit result set to items with particular parent IDs.
 * @param	    {string} args.parent_exclude Limit result set to all items except those of a particular parent ID.
 * @param	    {string} args.post Limit result set to comments assigned to specific post IDs.
 * @param	    {string} [args.status='publish'] Limit result set to comments assigned a specific status. Requires authorization.
 * @param	    {string} [args.type='comment'] Limit result set to comments assigned a specific type. Requires authorization.
 * @param	    {string} args.password The password for the post if it is password protected.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getComments().then((comments) => {
 * 		// Do something with comments.
 * });
 */
export const getComments = async (args = {}) => {
    const route = 'wp/v2/comments/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches a single comment based on the given id.
 * It will return a Promise containing either an error or the comment in JSON format.
 * 
 * @function    getComment
 * @param       {number} id 
 * @param       {Object} args
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @returns     {Promise<JSON>}
 */
export const getComment = async (id = 0, args = {}) => {
	if ('number' !== typeof id) throw new Error('id parameter needs to be a number.');
    const route = `wp/v2/comments/${id}`;
    const response = await getRestData(route, args);
	return response;
}

/**
 * Fetches the taxonomies of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the taxonomies.
 * 
 * @function    getTaxonomies
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {string} args.type Limit results to taxonomies associated with a specific post type.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getTaxonomies().then((taxonomies) => {
 * 		// Do something with taxonomies.
 * });
 */
export const getTaxonomies = async (args = {}) => {
	const route = 'wp/v2/taxonomies/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches a single comment based on the given id.
 * It will return a Promise containing either an error or the comment in JSON format.
 * 
 * @function    getTaxonomy
 * @param       {string} taxonomy An alphanumeric identifier for the taxonomy.
 * @param       {Object} args
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @returns     {Promise<JSON>}
 */
export const getTaxonomy = async (taxonomy, args = {}) => {
    const route = `wp/v2/taxonomies/${taxonomy}`;
    const response = await getRestData(route, args);
	return response;
}

/**
 * Fetches the media of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the media files.
 * 
 * @function    getMedia
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(string|number)} [args.page=1] Current page of the collection.
 * @param	    {(string|number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {string} args.search Limit results to those matching a string.
 * @param	    {string} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	    {string} args.author Limit result set to posts assigned to specific authors.
 * @param	    {string} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	    {string} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	    {string} args.exclude Ensure result set excludes specific IDs.
 * @param	    {string} args.include Limit result set to specific IDs.
 * @param	    {(string|number)} args.offset Offset the result set by a specific number of items.
 * @param	    {string} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {string} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {string} args.slug Limit result set to posts with one or more specific slugs.
 * @param	    {string} [args.status='publish'] Limit result set to posts assigned one or more statuses.
 * @param	    {string} args.mediaType Limit result set to attachments of a particular media type. One of: image, video, audio, application
 * @param	    {string} args.mimeType Limit result set to attachments of a particular MIME type.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getMedia().then((media) => {
 * 		// Do something with media.
 * });
 */
export const getMedia = async (args = {}) => {
    const route = 'wp/v2/media/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches the users of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the users.
 * 
 * @function    getUsers
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(string|number)} [args.page=1] Current page of the collection.
 * @param	    {(string|number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {string} args.search Limit results to those matching a string.
 * @param	    {string} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	    {string} args.exclude Ensure result set excludes specific IDs.
 * @param	    {string} args.include Limit result set to specific IDs.
 * @param	    {(string|number)} args.offset Offset the result set by a specific number of items.
 * @param	    {string} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {string} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {string} args.slug Limit result set to posts with one or more specific slugs.
 * @param	    {string} args.roles Limit result set to users matching at least one specific role provided. Accepts csv list or single role.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getUsers().then((users) => {
 * 		// Do something with users.
 * });
 */
export const getUsers = async (args = {}) => {
    const route = 'wp/v2/users/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches a single user based on the given id.
 * It will return a Promise containing either an error or the user in JSON format.
 * 
 * @function    getUser
 * @param       {number} id 
 * @param       {Object} args
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @returns     {Promise<JSON>}
 */
export const getUser = async (id = 0, args = {}) => {
	if ('number' !== typeof id) throw new Error('id parameter needs to be a number.');
    const route = `wp/v2/users/${id}`;
    const response = await getRestData(route, args);
	return response;
}

/**
 * Fetches the Post Types of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the post types.
 * 
 * @function    getPostTypes
 * @uses	    getRestData
 * @param	    {Object} args
 * @param	    {string} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @returns     {Promise<JSON>}
 * 
 * @example
 * getPostTypes().then((postTypes) => {
 * 		// Do something with postTypes.
 * });
 */
export const getPostTypes = async (args = {}) => {
    const route = 'wp/v2/types/';
	const response = await getRestData(route, args);
	return response;
};

/**
 * Fetches the settings of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the settings.
 * 
 * @function    getSettings
 * @uses	    getRestData
 * @param 	    {string} [route='/wp/v2/settings/'] Path to the pages endpoint.
 * @returns     {Promise<JSON>}
 * 
 * @example
 * getSettings().then((settings) => {
 * 		// Do something with settings.
 * });
 */
export const getSettings = async (route = 'wp/v2/settings/') => {
	const response = await getRestData(route);
	return response;
};