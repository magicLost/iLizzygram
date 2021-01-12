import { createTags } from "./tags";

describe("Fill mongo db", () => {
  test("It must create 25 tags and tags Id array", () => {
    const { tags, tagsId } = createTags(25);

    expect(tags).toHaveLength(25);
    expect(tagsId).toHaveLength(25);

    expect(tags[0]._id).toEqual(tagsId[0]);
  });
});
