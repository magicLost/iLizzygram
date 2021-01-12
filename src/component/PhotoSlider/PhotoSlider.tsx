import React, { useState, useMemo, useRef, useEffect } from "react";
import classesScss from "./PhotoSlider.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CarouselOpacity from "../Carousel/CarouselOpacity/CarouselOpacity";
import { useCarouselOpacity } from "../../hooks/carousel/carousel";
//import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from "@material-ui/icons/Description";
import IconButton from "@material-ui/core/IconButton";
//import ImageSharp from "../UI/ImageSharp";
import TransitionsModal from "../Modal/TransitionModal/TransitionModal";
//import Typography from "@material-ui/core/Typography";
//import Button from "@material-ui/core/Button";
import PhotoDesc from "../PhotoDesc/PhotoDesc";
import FinalImageSharp from "../UI/FinalImageSharp/FinalImageSharp";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
//import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client";
import {
  usePhotos,
  PhotoData,
  usePhotosWithSearch,
} from "../../hooks/photos/usePhotos";
import { IPhoto } from "../../../server/api/entity/Photo/Photo.model";
import { SEARCH } from "../../apolloClient/queries";
import CenteredTransitionModal from "../Modal/CenteredTransitionModal/CenteredTransitionModal";
import ModalCloseButton from "../UI/ModalCloseButton/ModalCloseButton";

//import { ISearchState } from "../../pages/index";

//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  showDescButton: {
    position: "absolute",
    top: "100px",
    right: "10px",
    zIndex: 1310,
  },
  backdrop: {
    zIndex: 1311,
    color: "#fff",
  },
  itemContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(100, 100, 100, 0.603)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface PhotoSliderProps {
  initActiveIndex?: number;

  //onEditPhoto: (photoId: string) => void;
}

export const getImageSharp = (photo: IPhoto) => {
  return (
    <FinalImageSharp
      base64={photo.base64}
      src={photo.src}
      srcSet={photo.srcSet}
      aspectRatio={photo.aspectRatio}
      isActive={true}
      alt="Зали что-то делает..."
    />
  );
};

export const getCarouselItems = (
  data: PhotoData,
  loading: boolean,
  error: ApolloError,
  activeIndex: number,
  getImageSharp: (photo: IPhoto) => JSX.Element,
  classes: any
) => {
  console.log("GET CarouselTranslate items", activeIndex);

  //if data === undefined and loading - show loading
  //if data === undefined and error - show null
  //else - show items

  if (!data && loading) {
    return [
      <div className={classes.itemContainer} key="loading">
        <CircularProgress color="inherit" />
      </div>,
    ];
  }

  if (!data && error) {
    return [<div key="error"></div>];
  }

  if (data && loading) {
    return data.photos.edges.map((photo, index) => {
      const image = getImageSharp(photo);
      if (index === activeIndex) {
        return (
          <div
            key={classes.root + photo.aspectRatio + index}
            className={classes.itemContainer}
          >
            {image}
            <div className={classes.loading}>
              <CircularProgress color="inherit" />
            </div>
          </div>
        );
      }
      return (
        <div
          key={classes.root + photo.aspectRatio + index}
          className={classes.itemContainer}
        >
          {image}
        </div>
      );
    });
  }

  return data.photos.edges.map((photo, index) => {
    const image = getImageSharp(photo);
    return (
      <div
        key={classes.root + photo.aspectRatio + index}
        className={classes.itemContainer}
      >
        {image}
      </div>
    );
  });
};

const PhotoSlider = ({
  //onEditPhoto,
  initActiveIndex = 0,
}: PhotoSliderProps) => {
  const classes = useStyles();

  const [isShowDesc, setIsShowDesc] = useState(false);

  /* const {
    data: {
      search: { isSortDesc, tagsIds, limit },
    },
  } = useQuery(SEARCH);

  const { data, loadMore, loading, error } = usePhotos(
    limit,
    isSortDesc,
    tagsIds
  ); */

  const { data, loadMore, loading, error } = usePhotosWithSearch();

  //TODO: on error show alert
  const length = data ? data.photos.edges.length : 1;

  const { opacity, isTranslated, activeIndex, controller } = useCarouselOpacity(
    length,
    initActiveIndex
  );

  const prevLoadingRef = useRef({ isData: false, isLoading: false, length });

  //console.log("[PRE RENDER] ", prevLoadingRef);
  useEffect(() => {
    /*  console.log(
      "[PRE COMPLETED FETCH MORE] ",
      prevLoadingRef.current.isData === true &&
        prevLoadingRef.current.isLoading === true &&
        loading === false,
      prevLoadingRef
    ); */
    if (
      prevLoadingRef.current.length - activeIndex === 1 &&
      prevLoadingRef.current.isData === true &&
      prevLoadingRef.current.isLoading === true &&
      loading === false
    ) {
      //console.log("[ON COMPLETED FETCH MORE] ", prevLoadingRef);
      prevLoadingRef.current = {
        isData: true,
        isLoading: false,
        length,
      };

      controller.onIncreaseIndex(undefined);
    }

    prevLoadingRef.current = {
      isData: data ? true : false,
      isLoading: loading,
      length,
    };
  }, [loading]);

  const onShowDesc = () => {
    setIsShowDesc(true);
  };

  const onHideDesc = () => {
    setIsShowDesc(false);
  };

  const onFetchMore =
    data && data.photos.pageInfo.hasNextPage ? loadMore : undefined;

  console.log("[RENDER PHOTO SLIDER] ", initActiveIndex, activeIndex, loading);
  return (
    <div className={classes.root}>
      {data && (
        <div className={classes.showDescButton}>
          <IconButton onClick={onShowDesc} aria-label="Показать описание...">
            <DescriptionIcon color="secondary" fontSize="large" />
          </IconButton>
        </div>
      )}

      <CarouselOpacity
        activeIndex={activeIndex}
        opacity={opacity}
        isTranslated={isTranslated}
        controller={controller}
        onFetchMore={onFetchMore}
      >
        {useMemo(
          () =>
            getCarouselItems(
              data,
              loading,
              error,
              activeIndex,
              getImageSharp,
              classes
            ),
          [data, loading, error]
        )}
      </CarouselOpacity>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CenteredTransitionModal isShow={isShowDesc} hideModal={onHideDesc}>
        <PhotoDesc
          tags={data ? data.photos.edges[activeIndex].tags : []}
          date={data ? data.photos.edges[activeIndex].date : null}
          desc={data ? data.photos.edges[activeIndex].description : ""}
          photo={data ? data.photos.edges[activeIndex] : undefined}
        />
        <ModalCloseButton
          ariaLabel="закрыть описание фото"
          onClick={onHideDesc}
        />
      </CenteredTransitionModal>
    </div>
  );
};

/* 
<img
        alt="hello"
        src="/home/nikki/Downloads/girl_300.jpeg"
        srcSet="
        /images/girl_300.jpeg 300w,
        /images/girl_600.jpeg 600w
      "
        sizes="(max-aspect-ratio: 1/1) 100vw, 100vh"
      />
*/

export default PhotoSlider;
