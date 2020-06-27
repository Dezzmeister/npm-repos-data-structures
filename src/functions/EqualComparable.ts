/**
 * Specifies an 'equals()' function that can be used to write custom equality checks.
 *
 * @author Joe Desmond
 */
export default interface EqualComparable {
	/**
	 * Returns true if this object is logically equal to another.
	 *
	 * IF IMPLEMENTING Hashable: This method is linked to 'hashcode()';
	 * if two objects are equal (by 'equals()'), then they MUST return the same hashcode.
	 * HashMap will not work correctly if this rule is not followed.
	 *
	 * @param {EqualComparable} other another EqualComparable
	 * @return {boolean} true if this object is logically equal to 'other'
	 */
	equals(other: EqualComparable): boolean;
}