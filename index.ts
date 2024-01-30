import { FrequencyMap } from "./FrequencyMap.ts";

const fMap = new FrequencyMap(["a", "b", "c", "a", "a", "b"]);

fMap.decrement("c");
fMap.increment("d");

console.dir(fMap); // { a: 3, b: 2, d: 1 }
console.log(fMap.sorted(false)); // [ 'a', 'b' , 'd' ]
