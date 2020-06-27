import { LinkedList, Hashable, EqualComparable } from "../";

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

test("Bulk Insertion/Removal Test", () => {
	const list = new LinkedList<Num>();
	expect(list.length()).toBe(0);
	expect(list.pop()).toBeNull();

	for (let i = 0; i < 500; i++) {
		expect(list.has(new Num(i))).toBe(false);
		expect(list.remove(new Num(i))).toBe(false);

		list.push(new Num(i));
		expect(list.length()).toBe(i + 1);
	}

	for (let i = 499; i >= 0; i--) {
		expect(list.pop()).not.toBeNull();
		expect(list.length()).toBe(i);

		list.peek();
		expect(list.length()).toBe(i);
	}
});

test("Removal/Presence Test", () => {
	const list = new LinkedList<Num>();

	for (let i = 0; i < 50; i++) {
		expect(list.remove(new Num(i))).toBe(false);
		list.push(new Num(i));
	}

	for (let i = 49; i >= 0; i--) {
		const latest = list.peek();
		expect(latest).not.toBeNull();

		if (latest) {
			expect(latest.value).toBe(i);
		}

		expect(list.has(new Num(i))).toBe(true);
		expect(list.remove(new Num(i))).toBe(true);
	}
});

test("Iterator Test", () => {
	const list = new LinkedList<Num>();

	for (let i = 0; i < 50; i++) {
		list.push(new Num(i));
	}

	let index = 49;
	for (const item of list) {
		expect(item.equals(new Num(index))).toBe(true);
		index--;
	}
});