import { asyncFunc, superFunc } from "./async";

describe("Async", () => {
  test("", async () => {
    const result = await asyncFunc();
    expect(result).toEqual("Hello");
  });

  test("", () => {
    const result = superFunc();
    expect(result).toBeInstanceOf(Promise);
  });
});
