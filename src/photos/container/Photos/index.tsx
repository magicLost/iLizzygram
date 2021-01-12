import React, { FC } from "react";
//import { usePhotos } from "./../../store/hook";
import { useAuth } from "../../../auth";
import PhotosWidget from "./Photos";

export const Photos = () => {
  const { user, loading } = useAuth();

  //const { photoState, loadMore } = usePhotos();

  console.log("[RENDER PHOTOS]");

  return (
    <PhotosWidget
      authUser={user}
      authLoading={loading}
      //photoState={photoState}
      //loadMore={loadMore}
    />
  );
};

export default Photos;
