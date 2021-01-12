import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import PhotoSlider, { getCarouselItems, getImageSharp } from "./PhotoSlider";
//import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
//import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import TransitionsModal from "../Modal/TransitionModal/TransitionModal";
import AddPhotoForm from "../../container/forms/AddPhotoForm/AddPhotoForm";
import { MockedProvider } from "@apollo/client/testing";
import {
  mockQueriesData,
  photos1Data,
} from "../WallOfPhotos/WallOfPhotos.stories";
import { cache } from "../../apolloClient/cache";
import ModalCloseButton from "../UI/ModalCloseButton/ModalCloseButton";

const useStyles = makeStyles({
  backdrop: {
    zIndex: 2000,
    color: "#fff",
    backgroundColor: "black",
  },
  container: {
    height: "100%",
  },
  deleteButton: {
    marginLeft: "20px",
  },
  close: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: "1315",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  },
  form: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "20px 0",
    overflow: "auto",

    position: "relative",
    maxWidth: "500px",
    //margin: "auto",
    maxHeight: "90%",
    textAlign: "center",
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

export default {
  component: PhotoSlider,
  title: "PhotoSlider",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const classes = useStyles();
  const [modalState, setModalState] = useState({
    openSlider: false,
    openForm: false,
  });

  return (
    <MockedProvider mocks={mockQueriesData} addTypename={true} cache={cache}>
      <>
        <Button
          onClick={() =>
            setModalState((prevState) => ({ ...prevState, openSlider: true }))
          }
        >
          Show slider
        </Button>

        <TransitionsModal
          isShow={modalState.openSlider}
          hideModal={() =>
            setModalState((prevState) => ({ ...prevState, openSlider: false }))
          }
          modalClass={classes.modal}
        >
          <PhotoSlider
            initActiveIndex={2}
            onDeletePhoto={() => console.log("onDeletePhoto")}
          />
          <ModalCloseButton
            ariaLabel="close photo slider"
            closeIconSize="large"
            onClick={() =>
              setModalState((prevState) => ({
                ...prevState,
                openSlider: false,
              }))
            }
          />
        </TransitionsModal>
        <TransitionsModal
          isShow={modalState.openForm}
          hideModal={() =>
            setModalState((prevState) => ({ ...prevState, openForm: false }))
          }
          modalClass={classes.modal}
        >
          <div className={classes.form}>
            <h4>Изменить фоту</h4>
            <AddPhotoForm />
          </div>
        </TransitionsModal>
      </>
    </MockedProvider>
  );
};

export const Test = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "red",
          zIndex: "100",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "100px",
            width: "10%",
            height: "10%",
            backgroundColor: "violet",
            zIndex: "1010",
          }}
        ></div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",

          backgroundColor: "cyan",
          zIndex: "100",
        }}
      ></div>
    </>
  );
};

export const Loading = () => {
  const classes = useStyles();
  const items = getCarouselItems(
    undefined,
    true,
    undefined,
    1,
    getImageSharp,
    classes
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "gray",
        margin: "auto",
      }}
    >
      {items}
    </div>
  );
};

export const MoreLoading = () => {
  const classes = useStyles();
  const items = getCarouselItems(
    {
      photos: {
        edges: [photos1Data.edges[0]],
      },
    },
    true,
    undefined,
    0,
    getImageSharp,
    classes
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        margin: "auto",
      }}
    >
      {items}
    </div>
  );
};
