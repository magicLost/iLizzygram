import React, { useState, useMemo, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CarouselOpacity from "../../../container/Carousel/CarouselOpacity";
import { useCarouselOpacity } from "../../../container/Carousel/CarouselOpacity/hook";
import DescriptionIcon from "@material-ui/icons/Description";
import IconButton from "@material-ui/core/IconButton";
import PhotoDesc from "../../component/PhotoDesc";
import FullScreenImage from "../../../component/UI/ImageSharp/FullScreenImage";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IPhoto } from "../../../types";
import { TPhotoData } from "../../types";
import IModal from "../../../component/IModal";
import ModalCloseButton from "../../../component/UI/ModalCloseButton";
import { TPhotosData, IPhotosState } from "./../../types";

/* FINAL COMPONENTS */

const _refSpinner = <CircularProgress color="inherit" />;

const Spinner = () => _refSpinner;

/* END FINAL COMPONENTS */

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
  photoState: IPhotosState;
  loadMorePhotos: () => void;
}

export const getImageSharp = (photo: IPhoto) => {
  return (
    <FullScreenImage
      photo={photo}
      isActive={true}
      alt="Зали что-то делает..."
    />
  );
};

export const getCarouselItems = (
  photos: TPhotosData,
  loading: boolean,
  error: boolean,
  activeIndex: number,
  classes: any
) => {
  console.log("[PHOTO SLIDER] GET CAROUSEL ITEMS", activeIndex);

  //if data === undefined and loading - show loading
  //if data === undefined and error - show null
  //else - show items

  if (!photos && loading) {
    return [
      <div className={classes.itemContainer} key="loading">
        <Spinner />
      </div>,
    ];
  }

  if (!photos && error) {
    return [<div key="error"></div>];
  }

  if (photos && loading) {
    const iPhotos = [...photos.values()];

    return iPhotos.map((photo, index) => {
      const image = getImageSharp(photo);
      if (index === activeIndex) {
        return (
          <div
            key={classes.root + photo.aspectRatio + index}
            className={classes.itemContainer}
          >
            {image}
            <div className={classes.loading}>
              <Spinner />
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

  const iPhotos = [...photos.values()];

  return iPhotos.map((photo, index) => {
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

interface IDescState {
  show: boolean;
  photo: TPhotoData;
}

const PhotoSlider = ({
  initActiveIndex = 0,
  photoState,
  loadMorePhotos,
}: PhotoSliderProps) => {
  const classes = useStyles();

  const [descState, setDescState] = useState<IDescState>({
    show: false,
    photo: undefined,
  });

  //TODO: on error show alert
  const length = photoState.photos ? photoState.photos.size : 1;

  const { controller } = useCarouselOpacity(length, initActiveIndex);

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
      prevLoadingRef.current.length - controller.activeIndex === 1 &&
      prevLoadingRef.current.isData === true &&
      prevLoadingRef.current.isLoading === true &&
      photoState.loading === false
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
      isData: photoState.photos ? true : false,
      isLoading: photoState.loading,
      length,
    };
  }, [photoState.loading]);

  const onShowDesc = () => {
    const photoIds = [...photoState.photos.keys()];

    const id = photoIds[controller.activeIndex];

    const photo = photoState.photos.get(id);

    //console.log("onShowDesc", id, photo);

    setDescState({
      photo: { id, photo },
      show: true,
    });
  };

  const onHideDesc = () => {
    setDescState({
      photo: undefined,
      show: false,
    });
  };

  const onFetchMore =
    photoState.photos && photoState.hasNextPage
      ? () => {
          loadMorePhotos();
        }
      : undefined;

  //const onFetchMore = photoState.photos && photoState.hasNextPage ? fetchMore : undefined;

  console.log(
    "[PHOTO SLIDER WIDGET] RENDER",
    initActiveIndex,
    controller.activeIndex,
    photoState.loading
  );
  return (
    <div className={classes.root}>
      <div className={classes.showDescButton}>
        <IconButton onClick={onShowDesc} aria-label="Показать описание...">
          <DescriptionIcon color="secondary" fontSize="large" />
        </IconButton>
      </div>

      <CarouselOpacity controller={controller} onFetchMore={onFetchMore}>
        {useMemo(
          () =>
            getCarouselItems(
              photoState.photos,
              photoState.loading,
              photoState.error,
              controller.activeIndex,
              classes
            ),
          [photoState.photos, photoState.loading, photoState.error]
        )}
      </CarouselOpacity>
      {/* <Backdrop className={classes.backdrop} open={photoState.loading}>
        <Spinner />
      </Backdrop> */}
      <IModal open={descState.show} onClose={onHideDesc}>
        <PhotoDesc photo={descState.photo} />
        <ModalCloseButton
          ariaLabel="закрыть описание фото"
          onClick={onHideDesc}
        />
      </IModal>
    </div>
  );
};

export default PhotoSlider;
