//import { initializeApollo } from "../apolloClient";

import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import PhotoSlider from "../component/PhotoSlider/PhotoSlider";
import Button from "@material-ui/core/Button";
import TransitionsModal from "../component/Modal/TransitionModal/TransitionModal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddPhotoForm from "../container/forms/AddPhotoForm/AddPhotoForm";
import WallOfPhotos from "../component/WallOfPhotos/WallOfPhotos";
import SearchFilterForm from "../container/forms/SearchFilterForm/SearchFilterForm";
import { useHome } from "../hooks/pages";
import CenteredTransitionModal from "../component/Modal/CenteredTransitionModal/CenteredTransitionModal";
import ModalCloseButton from "../component/UI/ModalCloseButton/ModalCloseButton";
import EditPhotoForm from "../container/forms/EditPhotoForm/EditPhotoForm";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  showAddForm,
  showPhotoSlider,
  showSearchFilterForm,
  hideSearchFilterForm,
  clearSearchResult,
  hideAddForm,
  hidePhotoSlider,
  hideEditForm,
} from "./../hooks/cache/cache.controller";

/* export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PHOTOS,
    //variables: allPostsQueryVars,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    //unstable_revalidate: 1,
  };
} */

export interface ISearchState {
  isSortDesc: boolean;
  tagsIds: string[];
  limit: number;
  isSearch: boolean;
}

const useStyles = makeStyles({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  },
  searchForm: {
    maxWidth: "500px",
    //width: "60%",
    margin: "auto",
    backgroundColor: "#fff",
    padding: "30px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
  addPhotoButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
  button: {
    textTransform: "none",
  },

  close: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1315,
  },
});

const ErrorElement = () => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) throw new Error("ERRRRROOOOOOOOORRRR");
  });

  return (
    <Button color="secondary" onClick={() => setIsError(true)}>
      Error.
    </Button>
  );
};

export default function Home() {
  const classes = useStyles();

  const { modalState, searchState } = useHome();

  //const client = useApolloClient();

  console.log("[RENDER INDEX PAGE] ");

  return (
    <>
      <Head>
        <title>Lizzygram - фотографии малышки.</title>
      </Head>

      <div className={classes.buttons}>
        <IconButton onClick={showSearchFilterForm}>
          <SearchIcon />
        </IconButton>

        <ErrorElement />

        <div className={classes.addPhotoButton}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
            size="small"
            onClick={showAddForm}
          >
            Добавить фото
          </Button>
        </div>

        {searchState.isSearch && (
          <Button onClick={clearSearchResult}>Отмена поиска</Button>
        )}
      </div>

      <WallOfPhotos onImageClick={showPhotoSlider} />

      <CenteredTransitionModal
        isShow={modalState.openSearch}
        hideModal={hideSearchFilterForm}
      >
        <SearchFilterForm
          onSetSearchState={hideSearchFilterForm}
          //tagsIds={tagsIds}
        />
        <ModalCloseButton
          ariaLabel="закрыть форму поиска фото"
          onClick={hideSearchFilterForm}
        />
      </CenteredTransitionModal>

      <CenteredTransitionModal
        isShow={modalState.openAddForm}
        hideModal={hideAddForm}
      >
        <AddPhotoForm />
        <ModalCloseButton
          ariaLabel="close photo slider"
          onClick={hideAddForm}
        />
      </CenteredTransitionModal>

      <TransitionsModal
        isShow={modalState.openSlider}
        hideModal={hidePhotoSlider}
        modalClass={classes.modal}
      >
        <PhotoSlider initActiveIndex={modalState.initActiveIndex} />
        <ModalCloseButton
          ariaLabel="close photo slider"
          closeIconSize="large"
          onClick={hidePhotoSlider}
        />
      </TransitionsModal>

      <CenteredTransitionModal
        isShow={modalState.openEditForm}
        hideModal={hideEditForm}
      >
        <EditPhotoForm hide={hideEditForm} />
        <ModalCloseButton
          ariaLabel="close edit photo form"
          onClick={hideEditForm}
        />
      </CenteredTransitionModal>

      {/* <WallOfPhotos /> */}
      {/* <Test /> */}
      {/* <div style={{ padding: "40px 10px 0" }}>
           <AddPhotoForm /> 
        </div> */}

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        main {
          padding-top: 25px;
          padding-bottom: 25px;
        }
      `}</style>
    </>
  );
}
