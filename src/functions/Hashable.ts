import EqualComparable from "./EqualComparable";

/**
 * Used to generate hashcodes. Classes that implement this interface can be used in a HashMap.
 *
 * @author Joe Desmond
 */
export default interface Hashable extends EqualComparable {

	/**
	 * Generates a hashcode to identify this object. Hashcodes do not have to be unique,
	 * but care should be taken so that hashcodes are rarely equal across different objects.
	 * A simple way to generate hashcodes is to use the properties of the object.
	 *
	 * If two objects are equal (by 'equals()'), then they MUST return the same hashcode.
	 * HashMap will not work correctly if this rule is not followed.
	 *
	 * @return {number} a hashcode for this object
	 */
	hashcode(): number;
}