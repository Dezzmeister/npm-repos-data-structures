/**
 * Implemented by any class that can be ordered with instances of another class.
 *
 * @author Joe Desmond
 */
export default interface Comparable<T> {

	/**
	 * Compares this object to another. Returns a negative number if this object is
	 * 'less' than the other, zero if it is equal, and a positive number if it is greater.
	 *
	 * @param {T} other other object to be compared to
	 * @return {number} a number determining the order of this and 'other'
	 */
	compareTo(other: T): number;
}