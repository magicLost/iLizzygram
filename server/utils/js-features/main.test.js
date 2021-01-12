const { makeJpgs } = require("../sharp");

const first = async () => {
  return new Promise((resolve) => setTimeout(() => resolve("Hello"), 500));
};

const second = async () => {
  const hello = await first();
  /* return new Promise((resolve) =>
    setTimeout(() => resolve({ hello, bye: "bye" }), 500)
  ); */
  return { hello, bye: "bye" };
};

const main = async () => {
  return second();
};

/* describe("Async", () => {
  test("", async () => {
    const result = await main();
    expect(result).toEqual({ bye: "bye", hello: "Hello" });
  });
});
 */

describe("Map", () => {
  let map = undefined;

  beforeEach(() => {
    map = new Map();
    map.set(234, "hello");
    map.set(222, "bye");
    map.set(1, "blue");
  });
  test("", () => {
    let first = [];

    for (let entry of map) {
      first = entry;
    }

    expect(first).toEqual([1, "blue"]);
  });

  test("Make array from values", () => {
    let values = [...map.values()];

    expect(values).toEqual(["hello", "bye", "blue"]);
  });
});
