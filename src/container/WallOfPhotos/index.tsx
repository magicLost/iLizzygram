import React from "react";
import { TTagsData } from "../../store/types";
import { TPhotoData } from "./../../photos/types";
import { connect } from "react-redux";
import { IGlobalState } from "../../store/types";
import { makeStyles } from "@material-ui/core/styles";

interface WallOfPhotosProps {
  photos?: TPhotoData;
  tags?: TTagsData;
  loading?: boolean;
  error?: boolean;
}

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },

  wrapper: {
    maxWidth: "850px",
    display: "flex",
    flexWrap: "wrap",
  },

  card: {
    maxWidth: "300px",
    overflow: "auto",
    padding: "10px",
    border: "2px solid yellow",
    borderRadius: "5px",
    margin: "10px",
  },
});

const makeTagsElements = (
  tags: TTagsData,
  photoTagsIds: { [id: string]: boolean }
) => {
  if (!tags) return "...Loading";

  const tagsElements = [];

  //console.log("MAKE TAG ELEMENT START", tags, photoTagsIds);

  for (let id in photoTagsIds) {
    //console.log("MAKE TAG ELEMENT START CICLE", id);

    if (photoTagsIds[id] !== true) continue;

    if (!tags.has(id)) throw new Error(`No info about tag with id - ${id}`);

    let tag = tags.get(id);

    //console.log("MAKE TAG ELEMENT ", id);

    tagsElements.push(
      <li key={id + Math.random()}>
        <ul>
          <li>Id - {id}</li>
          <li>Title - {tag.title}</li>
          <li>Name - {tag.name}</li>
        </ul>
      </li>
    );
  }
  return <ul>{tagsElements}</ul>;
};

const makePhotoElements = (
  photos: TPhotoData,
  tags: TTagsData,
  cardClass: string
) => {
  if (!photos) return undefined;

  const photosElements = [];

  photos.forEach((photo, id) => {
    let tagsElements = makeTagsElements(tags, photo.tags);

    photosElements.push(
      <li key={id} className={cardClass}>
        <ul>
          <li>Id - {id}</li>
          <li>Years old - {photo.yearsOld}</li>
          <li>_timestamp - {(photo._timestamp as any).seconds}</li>
          <li>
            Date - {(photo.date as any).toDate().toLocaleDateString("ru-RU")}
          </li>
          <li>Description - {photo.description}</li>
          <li>Tags: {tagsElements}</li>
        </ul>
      </li>
    );
  });

  return photosElements;
};

export const WallOfPhotos = ({
  photos,
  tags,
  loading,
  error,
}: WallOfPhotosProps) => {
  const classes = useStyles();

  const photosElements = makePhotoElements(photos, tags, classes.card);

  const onImgClick = (event: any) => {
    const index = event.target.dataset.index
      ? parseInt(event.target.dataset.index)
      : -1;
    if (index === -1) throw new Error(`Bad bad image index === ${index}`);
    //onImageClick(index);
  };

  console.log("[RENDER WALL_OF_PHOTS]", photos, tags, loading, error);

  return (
    <div className={classes.root}>
      <h3>Wall of photos.</h3>
      {error && <p>We've got error.</p>}
      {loading && <p>...Loading</p>}
      <ul className={classes.wrapper}>{photosElements}</ul>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    tags: state.tags.tags,
    photos: state.photos.photos,
    error: state.photos.error,
    loading: state.photos.loading,
  };
};

/* const mapDispatchToProps = dispatch => {
  return {};
}; */

export default connect(mapStateToProps)(WallOfPhotos);
