import { useEffect } from "react";
import { TPhotoData, TPhotoFirestoreResponse } from "../types";
import { TTagsData, TTagsFirestoreResponse } from "../../store/types";
import { ISearchState } from "../types";

export const limit = 6;

let photosUnsubscribe;

let limitSum = 6;

let query = undefined;

export const usePhotos = (
  photosCollection: any,
  fetchPhoto: (query: any) => Promise<void>,
  searchState: ISearchState
) => {
  //isNextPage, lastDocRef, fetchMore

  useEffect(() => {
    limitSum = limit;

    query = photosCollection.limit(limit);

    fetchPhoto(query);

    //make subscribe
  }, [searchState]);

  //we
  const fetchMore = () => {
    limitSum += limit;

    //unsubscribe

    //new subscribe with limitSum

    //fetch
  };
};

/////////////

//////////////

/* let photosUnsubscribe, photosUnsubscribe1;

export const useSubscribe = (
  photosCollection: any,
  setPhotos: (photos: TPhotoData) => void,
  errorPhotos: () => void
  //fetchTags
) => {
  useEffect(() => {
    //fetchTags();

    photosUnsubscribe = photosCollection.limit(3).onSnapshot(
      //@ts-ignore
      (snapshot: TPhotoFirestoreResponse[]) => {
        //console.log("SUCCESS", data.docs.length);
        const photos: TPhotoData = new Map();
        snapshot.forEach(photo => {
          photos.set(photo.id, photo.data());
        });
        setPhotos(photos);
      },
      error => {
        errorPhotos();
      }
    );

    return () => {
      if (photosUnsubscribe) photosUnsubscribe();
    };
  }, []);
};

export const reSubscribe = (
  photosCollection: any,
  setPhotos: (photos: TPhotoData) => void,
  errorPhotos: () => void
) => {
  if (photosUnsubscribe) photosUnsubscribe();
  photosUnsubscribe = photosCollection
    //.limit(6)
    //.where("tags.Hrj1grEKx6oM9Z1ZGP0G", "==", true)
    //.where("tags.L45RiBaK18AEoyVekFQT", "==", true)
    .onSnapshot(
      //@ts-ignore
      (snapshot: TPhotoFirestoreResponse[]) => {
        //console.log("SUCCESS", data.docs.length);
        const photos: TPhotoData = new Map();
        snapshot.forEach(photo => {
          photos.set(photo.id, photo.data());
        });
        setPhotos(photos);
      },
      error => {
        errorPhotos();
      }
    );
};

export const subscribe = (
  photosCollection: any
  //setPhotos: (photos: TPhotoData) => void,
  //errorPhotos: () => void
) => {
  if (photosUnsubscribe1) photosUnsubscribe1();
  photosUnsubscribe1 = photosCollection
    //.limit(6)
    //.where("tags.Hrj1grEKx6oM9Z1ZGP0G", "==", true)
    //.where("tags.L45RiBaK18AEoyVekFQT", "==", true)
    .onSnapshot(
      snapshot => {
        console.log("[ON SNAPSHOT]", snapshot.docChanges().length);

        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("New city: ", change.length);
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      },
      err => {
        console.log("[SUBSCRIBE ERROR]", err);
        //errorPhotos();
      }
    );
};
 */
