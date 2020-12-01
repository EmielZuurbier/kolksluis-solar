/**
 * Recursively loops through all nodes and stores every
 * textContent value of that node in an array.
 * 
 * @param 	{Node} node 
 * @param 	{Array} collection
 * @returns	{Node[]}
 */
const getTextNodeValues = (node, collection = []) => {
	if (node.nodeType === 3 && node.textContent !== '') {
		collection.push(node.textContent);
	}
	for (const childNode of node.childNodes) {
		collection = getTextNodeValues(childNode, collection);
	}
	return collection;
}

/**
 * Gets a collection of text nodes and returns them as a 
 * single readable string.
 * 
 * @uses	getTextNodeValues
 * @param 	{Element} element
 * @returns	{string}
 */
const getSentenceFromTextNodes = element => getTextNodeValues(element)
	.join('')
	.replace(/\s+/g, ' ')
	.trim();

/**
 * Takes a string on which it uses the replace method to
 * search for a part in the string which then will be replaced
 * with the same string wrapped in an element.
 * 
 * @param 	{string} query 
 * @param 	{string} sentence 
 * @param 	{string} wrapper 
 * @returns	{string}
 */
const wrapPartOfString = (query, sentence, wrapper = 'span') => sentence
	.replace(query, `<${wrapper}>${query}</${wrapper}>`);