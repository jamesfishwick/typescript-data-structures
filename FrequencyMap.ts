/**
 * FrequencyMap extends the built-in Map to keep track of frequency counts for values.
 * It overrides the set() and delete() methods to enforce using increment() and decrement() instead.
 */
export class FrequencyMap<T> extends Map<T, number> {
  /**
   * Constructor allows passing in an iterable to initialize the map.
   * Calls increment() for each element.
   */
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

  /**
   * Overrides Map set() to throw an error.
   * @override
   */
  override set(key: T, value: number): never {
    throw new Error(FrequencyMap.ERROR);
  }

  /**
   * Overrides Map delete() to throw an error.
   * @override
   */
  override delete(key: T): never {
    throw new Error(FrequencyMap.ERROR);
  }

  /**
   * Increments the value for the given element by 1.
   * Initializes to 0 if not present.
   */
  increment(element: T): this {
    const count = this.get(element) || 0;
    super.set(element, count + 1);
    return this;
  }

  /**
   * Decrements the value for the given element by 1.
   * Deletes the key if decremented to 0.
   * Returns true if deleted, false otherwise.
   */
  decrement(value: T): boolean {
    const count = this.get(value);
    if (count === 1) {
      return super.delete(value);
    } else if (count) {
      super.set(value, count - 1);
    }
    return false;
  }

  /**
   * Returns an array of the keys sorted by frequency count.
   * @param ascending - Sort ascending if true, descending if false.
   */
  sorted(ascending = true): ReadonlyArray<T> {
    const entries = [...this.entries()];
    entries.sort((a, b) => {
      return ascending ? a[1] - b[1] : b[1] - a[1];
    });
    return entries.map((entry) => entry[0]);
  }
}
