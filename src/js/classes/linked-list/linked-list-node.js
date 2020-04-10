export default class LinkedListNode {

	/**
	 * Initialize the node with any value and a reference to the next node.
	 * When the nextNode parameter is empty it will default to null.
	 * 
	 * @param {any} value Value of the node.
	 * @param {LinkedListNode} [nextNode=null] Next node to refer to.
	 */
	constructor(value, nextNode = null) {
		this.value = value;
		this.next = nextNode;
	}

}