import { useEffect } from "react";
//import { TTagsData, TTagsFirestoreResponse } from "../../store/types";
import { ISearchState } from "../types";
import { makeQueryBySerchTerm, isInitState } from "./utils";
import { IPhotoData } from "./../../types";

export const limit = 4;

let photosUnsubscribe;

let limitSum = 0;

let query = undefined;

let subscribeQuery = undefined;

let isSubscribeInit = false;

export const usePhotos = (
  photosCollection: any,
  fetchPhoto: (query: any, isFetchMore: boolean) => Promise<void>,
  setPhoto: (photo: IPhotoData, isAdd: boolean) => void,
  searchState: ISearchState
) => {
  //isNextPage, lastDocRef, fetchMore

  useEffect(() => {
    limitSum = limit;

    //query = photosCollection;

    if (isInitState(searchState)) {
      query = photosCollection.orderBy("_timestamp", "desc");
    } else {
      query = makeQueryBySerchTerm(photosCollection, searchState);
    }
    subscribeQuery = query;

    fetchPhoto(query.limit(limit + 1), false);

    //make subscribe
    if (photosUnsubscribe) {
      isSubscribeInit = false;
      photosUnsubscribe();
    }

    subscribe(setPhoto);
  }, [searchState]);

  return {
    fetchMore,
  };
};

const fetchMore = (
  fetchPhoto: (query: any, isFetchMore: boolean) => Promise<void>,
  setPhoto: (photo: IPhotoData, isAdd: boolean) => void,
  nextPageDocRef: any
) => {
  limitSum += limit;

  //query = photosCollection.startAt(doc);

  //subscribeQuery = photosCollection;
  if (!nextPageDocRef) throw new Error("No NEXT PAGE REF...");

  fetchPhoto(query.startAt(nextPageDocRef).limit(limit + 1), true);

  //unsubscribe
  if (photosUnsubscribe) {
    isSubscribeInit = false;
    photosUnsubscribe();
  }

  //new subscribe with limitSum
  subscribe(setPhoto);
};

export const subscribe = (
  //photosCollection: any,
  setPhoto: (photo: IPhotoData, isAdd: boolean) => void
  //errorPhotos: () => void
) => {
  if (photosUnsubscribe) photosUnsubscribe();
  photosUnsubscribe = subscribeQuery
    .limit(limitSum)
    //.limit(6)
    //.where("tags.Hrj1grEKx6oM9Z1ZGP0G", "==", true)
    //.where("tags.L45RiBaK18AEoyVekFQT", "==", true)
    .onSnapshot(
      snapshot => {
        console.log("[ON SNAPSHOT]", snapshot.docChanges().length);

        if (!isSubscribeInit) {
          isSubscribeInit = true;
          return;
        }

        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            /* const id = change.doc.id;
            photos.set(id, change.doc.data());
            const newPhotos = new Map(photos); */
            setPhoto(
              {
                id: change.doc.id,
                photo: change.doc.data(),
              },
              true
            );
            console.log("New item: ", change.doc.data());
          }
          if (change.type === "modified") {
            //modifyPhotoInState();
            /*   const id = change.doc.id;
            if (photos.has(id)) {
              photos.set(id, change.doc.data());
            }
            const newPhotos = new Map(photos); */
            setPhoto(
              {
                id: change.doc.id,
                photo: change.doc.data(),
              },
              false
            );
            console.log("Modified item: ", change.doc.data());
          }
          /*if (change.type === "removed") {
            console.log("Removed item: ", change.doc.data());
          }*/
        });
      },
      err => {
        console.log("[SUBSCRIBE ERROR]", err);
        //errorPhotos();
      }
    );
};
