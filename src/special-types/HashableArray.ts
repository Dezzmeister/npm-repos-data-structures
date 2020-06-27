import Hashable from "../functions/Hashable";
import EqualComparable from "../functions/EqualComparable";

/**
 * A hashable array; can be used in a HashMap. A static constructor is provided to create HashableArrays
 * from normal Javascript Arrays.
 *
 * @author Joe Desmond
 */
export default class HashableArray<T extends Hashable> extends Array<T> implements Hashable {

	/**
	 * Constructs a hashable array with an optional initial length.
	 *
	 * @param {number} length initial length
	 */
	constructor(length?: number) {
		if (length) {
			super(length as number);
		} else {
			super();
		}
	}

	/**
	 * Computes the hashcode of this array by summing the hashcodes of each item.
	 *
	 * @return {number} hashcode
	 */
	hashcode(): number {
		let sum = 0;

		for (let i = 0; i < this.length; i++) {
			sum += this[i].hashcode();
		}

		return sum;
	}

	/**
	 * First ensures that 'other' is a HashableArray of the same length, then checks that
	 * every element is equal (using 'equals()'). The equality of two HashableArrays
	 * depends on the order of the elements; two arrays with the same elements
	 * in different orders will not be considered equal.
	 *
	 * @param {EqualComparable} other other array
	 */
	equals(other: EqualComparable): boolean {
		if (!(other instanceof HashableArray)) {
			return false;
		}

		const otherArray = other as HashableArray<T>;

		if (this.length !== otherArray.length) {
			return false;
		}

		for (let i = 0; i < this.length; i++) {
			if (!(other[i].equals(this[i]))) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Constructs a HashableArray from a normal array. The type of the normal array
	 * must implement 'Hashable'.
	 *
	 * @param {T[]} array normal array
	 * @return {HashableArray<T>} version of normal array with 'hashcode()' and 'equals()' implemented
	 */
	public static from<T extends Hashable>(array: T[]): HashableArray<T> {
		const out = new HashableArray<T>();

		for (let i = 0; i < array.length; i++) {
			out[i] = array[i];
		}

		return out;
	}
}