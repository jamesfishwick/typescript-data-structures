export class FrequencyMap<T> extends Map<T, number> {
  constructor(iterable?: Iterable<T>) {
    super();
    if (iterable) {
      for (const item of iterable) {
        this.increment(item);
      }
    }
  }

  static ERROR =
    "This class uses increment and decrement methods. If you really want to use the parent method (why tho?), use Map.prototype.set() or Map.prototype.delete() instead.";

  override set(key: T, value: number): never {
    throw new Error(FrequencyMap.ERROR);
  }

  override delete(key: T): never {
    throw new Error(FrequencyMap.ERROR);
  }

  increment(element: T): this {
    const count = this.get(element) || 0;
    super.set(element, count + 1);
    return this;
  }

  decrement(value: T): boolean {
    const count = this.get(value);
    if (count === 1) {
      return super.delete(value);
    } else if (count) {
      super.set(value, count - 1);
    }
    return false;
  }

  sorted(ascending = true): ReadonlyArray<T> {
    const entries = [...this.entries()];
    entries.sort((a, b) => {
      return ascending ? a[1] - b[1] : b[1] - a[1];
    });
    return entries.map((entry) => entry[0]);
  }
}
