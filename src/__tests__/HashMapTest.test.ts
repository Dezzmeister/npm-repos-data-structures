import { HashMap, Hashable, EqualComparable } from "../";

class Num implements Hashable {
	public value:number;

	constructor(value: number) {
		this.value = value;
	}

	hashcode(): number {
		return this.value;
	}

	equals(other: EqualComparable): boolean {
		if (!(other instanceof Num)) {
			return false;
		}

		return (this.value === (other as Num).value);
	}
}

test("Collision Test", () => {
	const map = new HashMap<Num, string>(16, 1.0);
	const five = new Num(5);
	const twentyOne = new Num(21);

	map.put(five, "five");
	map.put(twentyOne, "twenty-one");
	map.put(new Num(37), "thirty-seven");

	const newFive = new Num(5);
	const newTwentyOne = new Num(21);

	expect(map.get(newFive)).toBe("five");
	expect(map.get(newTwentyOne)).toBe("twenty-one");
});

test("Bulk Size/Removal Test", () => {

	// Map should rehash and add new buckets as needed
	const map = new HashMap<Num, number>();
	expect(map.size()).toBe(0);

	for (let i = 0; i < 500; i++) {
		expect(map.remove(new Num(i))).toBe(false);

		map.put(new Num(i), i);
		expect(map.size()).toBe(i + 1);
	}

	const keys = map.keys();
	for (const key of keys) {
		expect(map.get(key)).toBe(key.value);
	}

	for (let i = 499; i >= 0; i--) {
		const hasEntry = map.has(new Num(i));
		expect(hasEntry).toBe(true);

		const removed = map.remove(new Num(i));
		expect(removed).toBe(true);
		expect(map.size()).toBe(i);
	}
});

test("Value Replacement Test", () => {
	const map = new HashMap<Num, number>(64, 1.0);

	for (let i = 0; i < 512; i++) {
		map.put(new Num(i), i);
	}

	for (let i = 0; i < 512; i++) {
		map.put(new Num(511 - i), i);
	}

	for (let i = 0; i < 512; i++) {
		expect(map.get(new Num(i))).toBe(511 - i);
	}
});