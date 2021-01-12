import React from "react";
import classes from "./WallOfPhotos.module.scss";
//import gql from "graphql-tag";
//import { SEARCH } from "../../apolloClient/queries";
//import { useQuery } from "@apollo/client";
import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";
import { usePhotosWithSearch } from "../../hooks/photos/usePhotos";
import { useResetStore } from "../../hooks/photos/useResetStore";

//import { ISearchState } from "../../pages/index";

//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface WallOfPhotosProps {
  onImageClick: (index: number) => void | undefined;
  //searchState: ISearchState;
}

//export const limit = 4;

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const getSkeletons = (numberOfSkeletons: number) => {
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
};

const getPhotosElements = (
  edges: any[],
  onImageClick: (event: any) => void | undefined
) => {
  return edges.map((photo, index) => {
    /* let width = "auto";
    let height = "100%"; */
    let width = "";
    let height = "";
    if (photo.aspectRatio <= 1.8) {
      width = "auto";
      height = "100%";
    } else {
      width = "100%";
      height = "auto";
    }
    return (
      <div
        key={classes.container + index}
        data-index={index}
        className={classes.container}
      >
        {/* <div className={classes.image}>{photo.name}</div> */}
        <img
          src={photo.iconSrc}
          onClick={onImageClick}
          data-index={index}
          style={{ width, height }}
        />
      </div>
    );
  });
};

export const getPhotos = (
  loading: boolean,
  error: any,
  data: { photos: { edges: any[] } },
  onImageClick: (event: any) => void | undefined,
  limit: number
) => {
  if (error && !data) return null;

  if (loading && data && data.photos) {
    //console.log("LOADING + DATA", data);
    const skeletons = getSkeletons(limit);
    const photosElements = getPhotosElements(data.photos.edges, onImageClick);

    const elements = photosElements.concat(skeletons);
    return elements;
  }

  if (loading) {
    //console.log("LOADING ");
    return getSkeletons(limit);
  }

  if (!data && !loading) {
    return getSkeletons(limit);
  }

  //console.log("DATA", data);
  return getPhotosElements(data.photos.edges, onImageClick);
};

const getLoadMoreButton = (
  onLoadMore: any,
  error: any,
  loading: boolean,
  data: { photos: { pageInfo: any } }
) => {
  if (error || loading) return null;

  if (!data && !loading) return null;

  if (data && !data.photos.pageInfo.hasNextPage) return null;

  return (
    <div className={classes.fetchMore}>
      <Button onClick={onLoadMore} variant="contained" color="primary">
        Загрузить еще...
      </Button>
    </div>
  );
};

const WallOfPhotos = ({ onImageClick }: WallOfPhotosProps) => {
  //const classes = useStyles();

  const onImgClick = (event: any) => {
    const index = event.target.dataset.index
      ? parseInt(event.target.dataset.index)
      : -1;
    if (index === -1) throw new Error(`Bad bad image index === ${index}`);
    onImageClick(index);
  };

  //console.log("PRE");
  /*  const {
    data: {
      search: { isSortDesc, tagsIds, limit },
    },
  } = useQuery(SEARCH);
  //console.log("AFTER");
  const { data, loadMore, loading, error } = usePhotos(
    limit,
    isSortDesc,
    tagsIds
  ); */

  const {
    limit,
    data,
    loadMore,
    loading,
    error,
    update,
  } = usePhotosWithSearch();

  useResetStore(update);

  const loadMoreButton = getLoadMoreButton(loadMore, error, loading, data);

  console.log(`RENDER WALL_OF_PHOTOS `, data, loading, error);
  const photoElements = getPhotos(loading, error, data, onImgClick, limit);
  //if (data) console.log(`RENDER WALL_OF_PHOTOS `, loading, error);

  return (
    <>
      <div className={classes.root}>{photoElements}</div>
      {loadMoreButton}
    </>
  );
};

export default WallOfPhotos;
