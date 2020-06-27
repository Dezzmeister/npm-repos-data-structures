/**
 * A map specification based on logical equality instead of reference equality.
 * Javascript's Map uses reference equality for objects, and this is often
 * undesirable.
 *
 * Implementations of this interface may require keys to implement an interface.
 * For example, 'HashMap' requires keys to implement 'Hashable'. This ensures
 * that the user provides some way to determine equality or organize the keys logically.
 *
 * @author Joe Desmond
 */
export default interface LogicalMap<K, V> {

	/**
	 * Gets the mapping for the given key, if it exists. Mappings can be inserted
	 * with 'put()'.
	 *
	 * @param {K} key key
	 * @return {V | null} value if it exists, or null if not
	 */
	get(key: K): V | null;

	/**
	 * Inserts a mapping into this map. If a mapping exists for the given key,
	 * replaces the old value with the given value. A key can be mapped to a null value.
	 *
	 * @param {K} key key
	 * @param {V | null} value value
	 */
	put(key: K, value: V | null): void;

	/**
	 * Removes the mapping for the given key, if it exists. Returns true if the
	 * mapping was removed succesfully, false if a mapping did not exist.
	 *
	 * @param {K} key key
	 * @return {boolean} true if the mapping for 'key' was removed
	 */
	remove(key: K): boolean;

	/**
	 * Returns true if the map contains a mapping for the given key.
	 *
	 * @param {K} key key
	 * @return {boolean} true if a mapping for 'key' exists
	 */
	has(key: K): boolean;

	/**
	 * Returns an array containing every key in the map.
	 *
	 * @return {K[]} array of all keys in the map
	 */
	keys(): K[];

	/**
	 * Returns an array containing every value in the map. If null mappings exist,
	 * some of the values will be null.
	 *
	 * @return {(V | null)[]} array of all values in the map
	 */
	values(): (V | null)[];

	/**
	 * Returns the number of entries in the map.
	 *
	 * @return {number} number of entries in the map
	 */
	size(): number;
}