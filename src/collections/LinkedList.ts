import EqualComparable from "../functions/EqualComparable";

/**
 * Internal node in a LinkedList
 */
type Node<T> = {
	next: Node<T> | null;
	item: T;
}

/**
 * A singly-linked list. Elements can be accessed in-order with an iterator.
 *
 * @author Joe Desmond
 */
export default class LinkedList<T extends EqualComparable> implements Iterable<T> {

	/**
	 * Root node
	 */
	private root:Node<T> | null;

	/**
	 * Number of elements in the list
	 */
	private size:number;

	/**
	 * Creates an empty list.
	 */
	constructor() {
		this.root = null;
		this.size = 0;
	}

	/**
	 * Returns an iterator to traverse the elements of this list.
	 *
	 * @return {Iterator<T>} an iterator for this list
	 */
	[Symbol.iterator](): LinkedListIterator<T> {
		return new LinkedListIterator<T>(this.root);
	}

	/**
	 * Inserts an element by prepending it to the front of the list.
	 *
	 * @param {T} item item to add
	 */
	public push(item: T): void {
		if (this.root === null) {
			this.root = {
				next: null,
				item
			};
			this.size = 1;

			return;
		}

		const newRoot:Node<T> = {
			next: this.root,
			item
		};

		this.root = newRoot;
		this.size++;
	}

	/**
	 * Removes the next element (the latest element to have been pushed on the list)
	 * and returns it.
	 *
	 * @return {T | null} the next element if there is one, or null if the list is empty
	 */
	public pop(): T | null {
		if (this.root === null) {
			return null;
		}

		const item = (this.root as Node<T>).item;
		this.root = this.root.next;
		this.size--;
		return item;
	}

	/**
	 * Removes the given item from the list, if it's present. Returns true if the item is removed,
	 * and false if not (if it doesn't exist in the list).
	 *
	 * @param {T} item item to remove
	 * @return {boolean} true if 'item' was removed from the list, false if it wasn't present
	 */
	public remove(item: T): boolean {
		let current = this.root;

		if (current === null) {
			return false;
		} else if (current.next === null) {
			if (item.equals(current.item)) {
				this.root = null;
				this.size--;
				return true;
			} else {
				return false;
			}
		}

		while (current.next !== null) {
			if (item.equals(current.next.item)) {
				current.next = current.next.next;
				this.size--;

				return true;
			}

			current = current.next;
		}

		return false;
	}

	/**
	 * Walks the list, and returns true if the list contains the given item.
	 *
	 * @param {T} item item to find
	 * @return {boolean} true if 'item' is in the list
	 */
	public has(item: T): boolean {
		let current = this.root;

		while (current !== null) {
			if (item.equals(current.item)) {
				return true;
			}

			current = current.next;
		}

		return false;
	}

	/**
	 * Returns the next element (the latest element to have been pushed on the list)
	 * WITHOUT returning it.
	 *
	 * @return {T | null} the next element if there is one, or null if the list is empty
	 */
	public peek(): T | null {
		if (this.root === null) {
			return null;
		} else {
			return this.root.item;
		}
	}

	/**
	 * The number of elements in this list. The size of the list is maintained separately;
	 * this function does not walk the list.
	 *
	 * @return {number} number of elements in the list
	 */
	public length(): number {
		return this.size;
	}
}

/**
 * Private iterator implementation for LinkedList.
 *
 * @author Joe Desmond
 */
class LinkedListIterator<T> implements Iterator<T> {

	/**
	 * The current node, or null if at the end of the list
	 */
	private current:Node<T> | null;

	/**
	 * Creates an iterator starting at the given node.
	 *
	 * @param {Node<T> | null} root first node
	 */
	constructor(root: Node<T> | null) {
		this.current = root;
	}

	/**
	 * Returns the next item in the LinkedList. If the list has no more elements,
	 * the 'value' property of the result will be null.
	 *
	 * @param {any} value unused
	 * @return {IteratorResult<T>} result
	 */
	next(value?: any): IteratorResult<T> {
		if (this.current === null) {
			return {
				done: true,
				value: null
			};
		} else {
			const item = this.current.item;
			this.current = this.current.next;
			return {
				done: false,
				value: item
			};
		}
	}
}