const faker = require("faker");

const tags = [
  "Hrj1grEKx6oM9Z1ZGP0G",
  "L45RiBaK18AEoyVekFQT",
  "Pa8GvtwrT1tMDgNLwy4S",
  "Ql2r2DFzzjZnzP2adh9Z",
  "YBa0wyeWwEB6takyExmF",
  "YxX09wTx6kWOfZQ0ORFs",
  "cdbI7sOCFVFv337chtBE",
];

describe("setUniqueTagsIds", () => {
  test("", () => {
    const idsSet = new Set();

    const length = 3;

    while (idsSet.size < length) {
      let id = tags[faker.random.number({ min: 0, max: 6 })];
      idsSet.add(id);
    }

    expect(idsSet).toEqual("hello");
  });
});
