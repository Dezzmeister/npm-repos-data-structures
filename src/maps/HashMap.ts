import Hashable from "../functions/Hashable";
import LogicalMap from "./LogicalMap";
import LinkedList from "../collections/LinkedList";
import EqualComparable from "../functions/EqualComparable";

/**
 * Internal representation of a HashMap entry.
 */
class Entry<K extends EqualComparable, V> implements EqualComparable {
	key: K;
	value: V | null;

	constructor(key: K, value: V | null) {
		this.key = key;
		this.value = value;
	}

	equals(other: EqualComparable): boolean {
		const entry = other as Entry<K, V>;

		return (this.key.equals(entry.key));
	}
}

/**
 * A hashmap implementation using separate chaining with LinkedLists.
 * Based on Java's HashMap implementation. A load factor determines when to add more buckets
 * and rehash existing entries. When the number of entries exceeds '(loadFactor * buckets.length)',
 * the number of buckets is doubled and entries in the old buckets are rehashed and inserted into
 * the new ones.
 *
 * The keys must provide a hashing function as well as an equality function (specified in Hashable interface).
 * This is based on Java's Object.equals() and Object.hashCode().
 *
 * @author Joe Desmond
 */
export default class HashMap<K extends Hashable, V> implements LogicalMap<K, V> {

	/**
	 * Default initial bucket count. Defaults to 16 (from Java HashMap)
	 */
	public static readonly DEFAULT_BUCKET_COUNT = 16;

	/**
	 * Default load factor. Defaults to 0.75 (from Java HashMap)
	 */
	public static readonly DEFAULT_LOAD_FACTOR = 0.75;

	private buckets:LinkedList<Entry<K, V>>[];
	private loadFactor:number;
	private length:number;

	/**
	 * Creates a HashMap. An initial bucket count and load factor can be provided. If a load factor
	 * is given, it must be greater than 0.4 (to prevent HashMap from needlessly eating memory). A load factor
	 * greater than or equal to 1.0 will prevent the HashMap from adding more buckets.
	 *
	 * @param {number} bucketCount number of buckets to start with, defaults to 'DEFAULT_BUCKET_COUNT'
	 * @param {number} loadFactor load factor, defaults to 'DEFAULT_LOAD_FACTOR'
	 */
	constructor(bucketCount?: number, loadFactor?: number) {
		let initBucketCount = HashMap.DEFAULT_BUCKET_COUNT;
		let initLoadFactor = HashMap.DEFAULT_LOAD_FACTOR;

		if (bucketCount !== undefined) {
			initBucketCount = bucketCount;
		}

		if (loadFactor !== undefined) {
			initLoadFactor = loadFactor;
		}

		if (initLoadFactor <= 0.4) {
			throw new Error("Load factor is too low! The load factor must be greater than 0.4");
		}

		this.buckets = new Array<LinkedList<Entry<K, V>>>(initBucketCount);

		for (let i = 0; i < this.buckets.length; i++) {
			this.buckets[i] = new LinkedList<Entry<K, V>>();
		}

		this.loadFactor = initLoadFactor;
		this.length = 0;
	}

	get(key: K): V | null {
		const hashcode = key.hashcode();
		const bucketIndex = hashcode % this.buckets.length;

		const bucket = this.buckets[bucketIndex];

		for (const entry of bucket) {
			if (key.equals(entry.key)) {
				return entry.value;
			}
		}

		return null;
	}

	private rehash(): void {
		const newBuckets = new Array<LinkedList<Entry<K, V>>>(this.buckets.length * 2);

		for (let i = 0; i < newBuckets.length; i++) {
			newBuckets[i] = new LinkedList<Entry<K, V>>();
		}

		const oldBuckets = this.buckets;
		this.buckets = newBuckets;
		this.length = 0;

		for (let i = 0; i < oldBuckets.length; i++) {
			for (const entry of oldBuckets[i]) {
				this.put(entry.key, entry.value);
			}
		}
	}

	put(key: K, value: V | null): void {
		if ((this.length + 1) > (this.buckets.length * this.loadFactor)) {
			this.rehash();
		}

		const newEntry:Entry<K, V> = new Entry<K, V>(key, value);

		const hashcode = key.hashcode();
		const bucketIndex = hashcode % this.buckets.length;
		const bucket = this.buckets[bucketIndex];

		for (const entry of bucket) {
			if (entry.equals(newEntry)) {
				entry.value = value;
				return;
			}
		}

		bucket.push(newEntry);
		this.length++;
	}

	remove(key: K): boolean {
		const entryToRemove = new Entry<K, V>(key, null);
		const bucket = this.buckets[key.hashcode() % this.buckets.length];

		if (bucket.remove(entryToRemove)) {
			this.length--;
			return true;
		}

		return false;
	}

	has(key: K): boolean {
		const entry = new Entry<K, V>(key, null);
		const bucket = this.buckets[key.hashcode() % this.buckets.length];

		return bucket.has(entry);
	}

	keys(): K[] {
		const out = new Array<K>();

		for (const bucket of this.buckets) {
			for (const entry of bucket) {
				out.push(entry.key);
			}
		}

		return out;
	}

	values(): (V | null)[] {
		const out = new Array<V | null>();

		for (const bucket of this.buckets) {
			for (const entry of bucket) {
				out.push(entry.value);
			}
		}

		return out;
	}

	size(): number {
		return this.length;
	}
}