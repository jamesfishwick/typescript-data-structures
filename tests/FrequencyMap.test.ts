import { describe, expect, it } from "@jest/globals";
import { FrequencyMap } from "../FrequencyMap.ts";

describe("FrequencyMap", () => {
  describe("increment()", () => {
    it("increments count for existing key", () => {
      const map = new FrequencyMap(["a", "b", "a"]);
      map.increment("a");
      expect(map.get("a")).toBe(3);
    });

    it("sets count to 1 for new key", () => {
      const map = new FrequencyMap(["a", "b"]);
      map.increment("c");
      expect(map.get("c")).toBe(1);
    });
  });

  describe("decrement()", () => {
    it("decrements count for existing key", () => {
      const map = new FrequencyMap(["a", "a", "b"]);
      map.decrement("a");
      expect(map.get("a")).toBe(1);
    });

    it("deletes key if count is 1", () => {
      const map = new FrequencyMap(["a"]);
      map.decrement("a");
      expect(map.has("a")).toBe(false);
    });

    it("returns false if key does not exist", () => {
      const map = new FrequencyMap(["a"]);
      expect(map.decrement("b")).toBe(false);
    });
  });

  describe("sorted()", () => {
    it("sorts keys by frequency ascending", () => {
      const map = new FrequencyMap(["a", "b", "a", "c"]);
      expect(map.sorted()).toEqual(["b", "c", "a"]);
    });

    it("sorts keys by frequency descending", () => {
      const map = new FrequencyMap(["a", "b", "a", "c"]);
      expect(map.sorted(false)).toEqual(["a", "b", "c"]);
    });
  });
});
