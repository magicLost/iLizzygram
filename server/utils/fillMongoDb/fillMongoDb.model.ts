import { createTags, tags } from "./dataGenerators/tags";
import { createPhotos } from "./dataGenerators/photos";
import { fillDb, insertTags, insertPhotos, getTagsIds } from "./mongo";

//if we have args to equals --fake-all
//we insert fake tags and take photos

//if we have args to equals --fake
//we insert into db our real tags
//then we get all tags ids
//and make some fake photos for example

//if we have args to equals --real
//we insert into db our real tags

export const fillWithFakeData = async (
  numberOfTags: number,
  numberOfPhotos: number
) => {
  try {
    const { tags, tagsId } = createTags(numberOfTags);

    const photos = createPhotos(numberOfPhotos, tagsId);

    await fillDb(tags, photos);
  } catch (err) {
    console.error(err.message);
  }
};

export const fillRealTagsAndFakePhoto = async (numberOfPhotos: number) => {
  try {
    await insertTags(tags);

    const tagsIds = await getTagsIds();

    const photos = createPhotos(numberOfPhotos, tagsIds);

    //insert photos
    await insertPhotos(photos);
  } catch (err) {
    console.error(err.message);
  }
};

export const fillRealTagsNoPhoto = async () => {
  try {
    //console.log("fillRealTagsNoPhoto");
    await insertTags(tags);
    //console.log("INSERT RESULT", JSON.stringify(result));
  } catch (err) {
    console.error("ERROR ", err.message);
  }
};
