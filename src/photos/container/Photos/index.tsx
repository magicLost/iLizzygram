import React from "react";
//import { usePhotos } from "./../../store/hook";
import { useEditor } from "../../../auth/hook/useEditor";
import PhotosWidget from "./Photos";

export const Photos = () => {
  const { user, loading } = useEditor();

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
