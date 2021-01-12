import { isEqualSearchState, isSameArrayValues } from "./utils";

describe("isSameArrayValues", () => {
  test("", () => {
    expect(isSameArrayValues(["one", "two"], ["two", "one"])).toEqual(true);
    expect(isSameArrayValues(["one", "two"], ["one", "two"])).toEqual(true);
    expect(isSameArrayValues(["one", "two"], ["one"])).toEqual(false);
    expect(isSameArrayValues(["one", "two"], ["one", "two", "three"])).toEqual(
      false
    );
    expect(isSameArrayValues(["one", "two", "three"], ["one", "two"])).toEqual(
      false
    );
  });
});

describe("isEqualSearchState", () => {
  test("", () => {
    expect(
      isEqualSearchState(
        { yearsOld: 2, tagsIds: ["one", "two"] },
        { yearsOld: 2, tagsIds: ["one", "two"] }
      )
    ).toEqual(true);
    expect(
      isEqualSearchState(
        { yearsOld: 2, tagsIds: ["one", "two"] },
        { yearsOld: 2, tagsIds: ["one"] }
      )
    ).toEqual(false);
    expect(
      isEqualSearchState(
        { yearsOld: 1, tagsIds: ["one", "two"] },
        { yearsOld: 2, tagsIds: ["one", "two"] }
      )
    ).toEqual(false);
  });
});
