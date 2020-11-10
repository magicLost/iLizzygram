import { fromFormDataToState, fromStateToFormData } from "./helper";

const formData = {
  ages: [0, 2],
  tags: { 123: true, 234: false, 222: false },
  isSortDesc: false,
};

const state = {
  tagsIds: ["124", "345", "236"],
  minDate: undefined,
  maxDate: undefined,
  orderBy: "",
};

describe("fromFormDataToState", () => {
  test("", () => {
    const result = fromFormDataToState(formData);

    expect(result).toEqual({
      maxDate: undefined,
      minDate: undefined,
      orderBy: "",
      tagsIds: ["123"],
    });

    const formData1 = {
      ages: [1, 1],
      tags: { 123: false, 234: false, 222: false },
      isSortDesc: true,
    };

    const res = fromFormDataToState(formData1);

    expect(res).toEqual({
      maxDate: new Date(2020, 7, 8),
      minDate: new Date(2019, 7, 8),
      orderBy: "desc",
      tagsIds: [],
    });
  });
});

describe("fromStateToFormData", () => {
  test("", () => {
    const result = fromStateToFormData(state);

    expect(result).toEqual({
      ages: [0, 2],
      isSortDesc: false,
    });

    const state1 = {
      tagsIds: ["124", "345", "236"],
      maxDate: new Date(2020, 7, 8),
      minDate: new Date(2019, 7, 8),
      orderBy: "desc",
    };

    const result1 = fromStateToFormData(state1);

    expect(result1).toEqual({
      ages: [1, 1],
      isSortDesc: true,
    });
  });
});
