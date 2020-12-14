import React from "react";
import WallOfPhotos from "./WallOfPhotos";
import { photosData } from "./../../photos/__mock/data";

export default {
  component: WallOfPhotos,
  title: "Photos/WallOfPhotos",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = args => <WallOfPhotos {...args} />;

/* photos,
  loadMorePhotos,
  reLoadPhotos,
  hasNextPage,
  loading,
  error, */

export const Default = Template.bind({});
Default.args = {
  photos: photosData,
  loading: false,
  hasNextPage: false,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  userUID: "user13",
};

export const Loading = Template.bind({});
Loading.args = {
  photos: undefined,
  loading: true,
  hasNextPage: true,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};
