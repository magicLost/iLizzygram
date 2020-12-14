import React, { FC } from "react";
import { usePhotos } from "./../../store/hook";
import { useAuth } from "../../../auth";
import PhotosWidget from "./Photos";

export const Photos: FC<undefined> = () => {
  const { user, loading } = useAuth();

  const { photoState, loadMore } = usePhotos();

  console.log("[RENDER PHOTOS]", photoState);

  return (
    <PhotosWidget
      authUser={user}
      authLoading={loading}
      photoState={photoState}
      loadMore={loadMore}
    />
  );
};

export default Photos;
