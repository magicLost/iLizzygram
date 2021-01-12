import { generatePhotos } from "./dataGenerator/photos";
import { getTagsIds } from "./dataGenerator/tags";

export const getAll = async (collection: any): Promise<Map<string, any>> => {
  const result = await collection
    //.where("tags.YxX09wTx6kWOfZQ0ORFs", "==", true)
    //.where("date", "<=", new Date(2019, 12, 17))
    //.orderBy("date", "desc")
    .limit(100)
    .get(); //orderBy("_timestamp")
  //console.log("SUCCESS GET");
  const res = new Map<string, any>();

  result.docs.map(item => {
    res.set(item.id, item.data());
  });

  return res;
};

export const resFirestoreToMapObj = (result: any): Map<string, any> => {
  const res = new Map<string, any>();

  result.docs.map(item => {
    res.set(item.id, item.data());
  });

  return res;
};

export const generateAndSavePhotosData = (
  collection: any,
  tags: Map<string, any>
) => {
  const tagsIds = getTagsIds(tags);

  const photos = generatePhotos(9, tagsIds);

  //console.log("Success generate", photos);

  const photosPromises = [];

  //@ts-ignore
  for (let photo of photos) {
    //console.log("PUSH", photo);
    photosPromises.push(collection.doc(photo[0]).set(photo[1]));
  }

  return Promise.all(photosPromises);
};

export const updatePhotosWithTagsArrField = async (collection: any) => {
  const resPromises = [];

  const photosData = await collection.get();

  photosData.docs.map(photo => {
    let tags = photo.data().tags;
    let id = photo.id;

    console.log("UpDATE", id, tags);
  });
};

export const makeTagsArr = (tags: { [id: string]: boolean }): string[] => {
  const tagsArr = [];
  for (let tagId in tags) {
    if (tags[tagId] === true) tagsArr.push(tagId);
  }

  return tagsArr;
};

export const make = (tagsIds: string[]) => {
  let count = 0;
  let result: string[][] = [];
  let resultTemp: string[] = [];
  let init = false;

  for (let id in tagsIds) {
    result[id] = [];
  }

  //let stop = false;
  for (let id of tagsIds) {
    init = false;
    for (let id1 of tagsIds) {
      if (id === id1) {
        init = true;

        result[count].push(id1);
        resultTemp.push(id1);
      } else if (init) {
        /* if (!stop) {
          for (let item of result) {
            resultTemp.push(item + "|" + id1);
            //console.log("result", item);
          }

          result = [...resultTemp];
        } else {
          for (let item of resAfterStop) {
            resultTemp.push(item + "|" + id1);
          }

          resAfterStop = [...resultTemp];
        } */

        for (let item of result[count]) {
          resultTemp.push(item + "|" + id1);
          //console.log("result", item);
        }

        result[count] = [...resultTemp];
      }
    }

    count++;
    resultTemp = [];
  }

  return result;
};

/* export const make = (tagsIds: string[]) => {
  let count = 0;
  let resAfterStop = [];
  let result = [];
  let resultTemp = [];
  let init = false;
  let stop = false;
  for (let id of tagsIds) {
    init = false;
    for (let id1 of tagsIds) {
      if (id === id1) {
        init = true;

        if (stop) {
          resultTemp = [];
          resAfterStop.push(id1);
          resultTemp.push(id1);
        } else {
          result.push(id1);
          resultTemp.push(id1);
        }
      } else if (init) {
        if (!stop) {
          for (let item of result) {
            resultTemp.push(item + "|" + id1);
            //console.log("result", item);
          }

          result = [...resultTemp];
        } else {
          for (let item of resAfterStop) {
            resultTemp.push(item + "|" + id1);
          }

          resAfterStop = [...resultTemp];
        }
      }
    }

    stop = true;
  } 

  return [result, resAfterStop];

  /*  const resultSet = new Set(result);

  const r = [];

  resultSet.forEach(val => r.push(val));

  return r; 
};

/* export const make = (tagsIds: string[]) => {
  let resAfterStop = [];
  let result = [];
  let resultTemp = [];
  let init = false;
  let stop = false;
  for (let id of tagsIds) {
    init = false;
    for (let id1 of tagsIds) {
      if (id === id1) {
        init = true;

        if (stop) {
          resultTemp = [];
          resAfterStop.push(id1);
          resultTemp.push(id1);
        } else {
          result.push(id1);
          resultTemp.push(id1);
        }
      } else if (init) {
        if (!stop) {
          for (let item of result) {
            resultTemp.push(item + "|" + id1);
            //console.log("result", item);
          }

          result = [...resultTemp];
        } else {
          for (let item of resAfterStop) {
            resultTemp.push(item + "|" + id1);
          }

          resAfterStop = [...resultTemp];
        }
      }
    }

    stop = true;
  }

  return [result, resAfterStop];

  /*  const resultSet = new Set(result);

  const r = [];

  resultSet.forEach(val => r.push(val));

  return r; 
};
 */
