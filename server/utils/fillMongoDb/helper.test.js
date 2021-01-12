import { fillArrayWithUniqueNumbers, randomlyInitializeArray } from "./helper";

describe("Fill mongo db", () => {
  test("It must create array with unique values", () => {
    let numbers = [];

    fillArrayWithUniqueNumbers(numbers, 20, 15);

    expect(numbers).toHaveLength(15);

    numbers = [];

    fillArrayWithUniqueNumbers(numbers, 30, 25);

    expect(numbers).toHaveLength(25);

    numbers = [];

    fillArrayWithUniqueNumbers(numbers, 50, 45);

    expect(numbers).toHaveLength(45);
  });
});
