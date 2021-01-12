import React, { FC, MouseEvent } from "react";
import { TTagsData } from "../../store/types";
import { TPhotosData } from "./../../photos/types";
//import { connect } from "react-redux";
//import { IGlobalState } from "../../store/types";
import classes from "./WallOfPhotos.module.scss";
//import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//import Skeleton from "@material-ui/lab/Skeleton";
import { limitPhotosPerQuery as limit } from "../../config";
import PhotoCard from "./../../photos/component/PhotoCard";
import PhotoSkeletons from "../../component/PhotoSkeletons";
import commonClasses from "./../../../styles/commonClasses.module.scss";

interface WallOfPhotosProps {
  photos: TPhotosData;
  loadMorePhotos: () => void;
  reLoadPhotos: () => void;
  hasNextPage: boolean;
  loading: boolean;
  error: boolean;
  showPhotoSlider: (event: any) => void;
  showEditPhotoForm: (index: number) => void;
  userUID: string;
}

/* const getSkeletons = (numberOfSkeletons: number) => {
  const elements = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    elements.push(
      <div
        key={classes.container + "_skeleton_" + i}
        className={classes.container}
      >
        <Skeleton variant="rect" width={320} height={180} />
      </div>
    );
  }
  return elements;
}; */

const getPhotosElements = (
  photos: TPhotosData,
  showPhotoSlider: (event: MouseEvent<any>) => void,
  showEditPhotoForm: (index: number) => void,
  userUID: string
) => {
  const elements = [];
  let index = 0;

  photos.forEach((photo, id) => {
    /* 
    let width = "";
    let height = "";
    if (photo.aspectRatio <= 1.8) {
      width = "auto";
      height = "100%";
    } else {
      width = "100%";
      height = "auto";
    }*/

    /*  <div
        key={classes.container + id}
        data-index={index}
        className={classes.container}
      >
        {/* <div className={classes.image}>{photo.name}</div> /}
        <img
          src={photo.iconSrc}
          onClick={showPhotoSlider}
          data-index={index}
          style={{ width, height }}
        />
      </div> */
    elements.push(
      <PhotoCard
        key={id}
        isEditable={userUID === photo.addedByUserUID}
        photo={photo}
        onImageClick={showPhotoSlider}
        showEditPhotoForm={showEditPhotoForm}
        index={index}
        alt="Лиза что-то делает"
      />
    );
    index++;
  });

  return elements;
};

/* export const getPhotos = (
  photos: TPhotosData,
  loading: boolean,
  error: any,
  onImageClick: (event: any) => void | undefined,
  limit: number
) => {
  if (error && !photos) return null;

  if (loading && photos) {
    //console.log("LOADING + DATA", data);
    const skeletons = getSkeletons(limit);
    const photosElements = getPhotosElements(photos, onImageClick);

    const elements = photosElements.concat(skeletons);
    return elements;
  }

  if (loading) {
    //console.log("LOADING ");
    return getSkeletons(limit);
  }

  if (!photos && !loading) {
    return getSkeletons(limit);
  }

  //console.log("DATA", data);
  return getPhotosElements(photos, onImageClick);
}; */

const getLoadMoreButton = (
  photos: TPhotosData,
  hasNextPage: boolean,
  onLoadMore: any,
  error: any,
  loading: boolean
) => {
  if (error || loading) return null;

  if (!photos && !loading) return null;

  if (photos && !hasNextPage) return null;

  return (
    <div className={classes.fetchMore}>
      <Button onClick={onLoadMore} variant="contained" color="primary">
        Загрузить еще...
      </Button>
    </div>
  );
};

export const WallOfPhotos: FC<WallOfPhotosProps> = ({
  photos,
  loadMorePhotos,
  reLoadPhotos,
  hasNextPage,
  loading,
  error,
  showEditPhotoForm,
  showPhotoSlider,
  userUID,
}) => {
  //const classes = useStyles();

  let content = undefined;

  if (error) {
    content = (
      <div className={classes.error}>
        <p className={classes.msg}>Какая-то ошибка при загрузке фото...</p>
        <Button onClick={reLoadPhotos}>Попробовать еще раз</Button>
      </div>
    );
  } else if (loading) {
    if (photos) {
      //const skeletons = getSkeletons(limit);
      const photosElements = getPhotosElements(
        photos,
        showPhotoSlider,
        showEditPhotoForm,
        userUID
      );

      //content = photosElements.concat(skeletons);
      content = (
        <>
          {photosElements}
          <PhotoSkeletons numberOfSkeletons={limit} />
        </>
      );
    } else {
      content = <PhotoSkeletons numberOfSkeletons={limit} />;
      //content = getSkeletons(limit);
    }
  } else {
    if (photos) {
      content = getPhotosElements(
        photos,
        showPhotoSlider,
        showEditPhotoForm,
        userUID
      );
    } else {
      content = (
        <>
          <p className={classes.message}>У нас пока нет ни одной фоты...</p>
        </>
      );
    }
  }

  const loadMoreButton = getLoadMoreButton(
    photos,
    hasNextPage,
    loadMorePhotos,
    error,
    loading
  );

  //const photoElements = getPhotos(photos, loading, error, onImgClick, limit);

  console.log("[RENDER WALL_OF_PHOTS WIDGET]");

  return (
    <>
      <div className={commonClasses.wallOfPhotos}>{content}</div>
      {loadMoreButton}
    </>
  );
};

export default WallOfPhotos;
