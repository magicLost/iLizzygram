import React, { useEffect, useMemo, useState } from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { photoData } from "./data";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import PhotoSlider from "./PhotoSlider";
import { modalReducer, tagsReducer } from "../../../store";

export default {
  component: PhotoSlider,
  title: "Photos/PhotoSlider",
  decorators: [
    /* story => (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
          width: "700px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        {story()}
      </div>
    ), */
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

//CONFIG REDUX
const reducer = combineReducers({
  //modal: modalReducer,
  tags: tagsReducer,
});

const composeEnhancers = compose;

//const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)) //...middleware
);

interface IPhotoState {
  photos: Map<string, any>;
  hasNextPage: boolean;
  nextPageDocRef: any;
  loading: boolean;
  error: boolean;
}

const initPhotoState: IPhotoState = {
  photos: photoData,
  hasNextPage: true,
  nextPageDocRef: "ref",
  loading: false,
  error: false,
};

let prev = 1;

const fetchPhoto = (photoData: Map<string, any>) => {
  return new Promise<Map<string, any>>((resolve, reject) => {
    const photos = new Map(photoData);
    //@ts-ignore
    const entries = [...photos.entries()];

    const index = prev === 0 ? 1 : 0;
    prev = prev === 0 ? 1 : 0;

    photos.set(Date.now().toString(), entries[0][1]);

    console.log("newPhotoData", photos, entries[0][0], entries[0][1]);

    setTimeout(() => {
      resolve(photos);
    }, 2000);
  });
};

export const Default = () => {
  const [photoState, setPhotoState] = useState(initPhotoState);

  const fetchMore = async () => {
    setPhotoState(state => ({
      ...state,
      loading: true,
    }));

    const newPhotoData = await fetchPhoto(photoState.photos);

    setPhotoState(state => ({
      ...state,
      photos: newPhotoData,
      loading: false,
    }));
  };

  return (
    <Provider store={store}>
      <PhotoSlider photoState={photoState as any} loadMorePhotos={fetchMore} />
    </Provider>
  );
};
