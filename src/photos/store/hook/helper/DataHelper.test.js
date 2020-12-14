import { isInSearchTerms } from "./DataHelper";

describe("isInSearchTerms", () => {
  test("", () => {
    const search = {
      yearsOld: -1,
      tagsIds: [],
    };

    const photoData = {
      yearsOld: 2,
      tags: { by: true },
    };

    let result = isInSearchTerms(search, photoData);

    expect(result).toEqual(true);

    search.yearsOld = 2;

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(true);

    search.yearsOld = 1;

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(false);

    search.tagsIds = ["by"];

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(false);

    search.yearsOld = 2;

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(true);

    search.tagsIds = ["by", "three", "your"];

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(false);

    photoData.tags.three = true;
    photoData.tags.your = true;
    photoData.tags.blue = true;

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(true);

    result = isInSearchTerms(search, {});

    expect(result).toEqual(true);
  });
});
