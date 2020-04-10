import LinkedListNode from './linked-list-node.js';

/**
 * Unique head key for the instances.
 */
const head = Symbol('head');

/**
 * LinkedList
 * 
 * Creates a singly linked list to store data in a subsequent manner.
 */
export default class LinkedList {

	/**
	 * Initialize without any settings.
	 */
	constructor() {
		this[head] = null;
	}

	/**
	 * Returns iterable object of all values of the nodes.
	 * 
	 * @yields {any} The value of the current node.
	 */
	*values() {
		let node = this[head];
		while (node !== null) {
			yield node.value;
			node = node.next;
		}
	}

	/**
	 * Iterator protocol to use for...of loops on the instance.
	 * 
	 * @returns {GeneratorFunction}
	 */
	[Symbol.iterator]() {
        return this.values();
    }

	/**
	 * Appends a new LinkedListNode instance and places it in the correct position.
	 * 
	 * @param 	{any} value Value of the node.
	 * @returns	{this} The current instance.
	 */
	append(value) {
		const node = new LinkedListNode(value);
		if (this[head] === null) {
			this[head] = node;
		} else {
			let current = this[head];
			while (current.next !== null) {
				current = current.next;
			}
			current.next = node;
		}
		return this;
	}

	/**
	 * Returns the node at the given index when found, otherwise it returns null.
	 * 
	 * @param 	{number} index Index of node.
	 * @returns	{(LinkedListNode|null)} The found node or null.
	 */
	get(index) {
		if ((this[head] === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
		}
		let counter = 0;
        let node = this[head];
        while (node !== null) {
            if (counter === index) {
               return node;
            }
            counter++;
            node = node.next;
        }
        return null;
	}

	/**
	 * Inserts a LinkedListNode with a value at the specified index.
	 * 
	 * @param 	{any} value The value of the node.
	 * @param 	{number} index The index to insert the node in.
	 * @returns	{this} The current instance.
	 */
	insert(value, index) {
		if (index < 0) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
		}
		if (this[head] === null) {
			return this.append(value);
		}
		if (index === 0) {
			this[head] = new LinkedListNode(value, this[head]);
			return;
		}
		const previous = this.get(index - 1);
        const node = new LinkedListNode(value);
        node.next = previous.next;
        previous.next = node;
        return this;
	}

	/**
	 * Removes a node from the list based on the index.
	 * 
	 * @param 	{number} index The index of the node to remove.
	 * @returns	{any} The value of the removed node.
	 */
	remove(index) {
		if ((this[head] === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
		}
		if (index === 0) {
			const value = this[head].value;
			this[head] = this[head].next;
			return value;
		}
        let current = this[head];
        let previous = null;
		let i = 0;
		while ((current !== null) && (i < index)) {
            previous = current;
            current = current.next;
            i++;
		}
		if (current !== null) {
            previous.next = current.next;
            return current.value;
		}
		throw new RangeError(`Index ${index} does not exist in the list.`);
	}

	/**
	 * Returns the first node that has the value in the list or null if it is not found.
	 * 
	 * @param 	{any} value Value to search for.
	 * @returns	{(LinkedListNode|null)} The found node or null.
	 */
	search(value) {
		let node = this[head];
		while (node !== null) {
			if (node.value === value) {
				return node;
			}
			node = node.next;
		}
		return null;
	}

	/**
	 * Reverses the direction of which the head is pointing and puts all nodes in the reverse order.
	 * 
	 * @returns	{this} The current instance.
	 */
	reverse() {
		let node = this[head];
		let nextNode = null;
		let previousNode = null;
		while (node !== null) {
			nextNode = node.next;
			node.next = previousNode;
			previousNode = node;
			node = nextNode;
		}
		this[head] = previousNode;
		return this;
	}

}