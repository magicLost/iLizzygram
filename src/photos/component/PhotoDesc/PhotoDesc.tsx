import React from "react";
import classes from "./PhotoDesc.module.scss";
//import { makeStyles } from "@material-ui/core/styles";
//import IconButton from "@material-ui/core/IconButton";
//import ImageSharp from "../../../component/UI/ImageSharp";
//import ImageWithDesc from "../UI/ImageWithDesc/ImageWithDesc";
//import IModal from "../../../component/IModal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//import CloseIcon from "@material-ui/icons/Close";
import { ITagsState } from "../../../store/types";
//import { modalVar } from "../../apolloClient/cache";
import { TPhotoData } from "../../types";
//import { connect } from "react-redux";
//import { fetchTagsAC, showEditFormAC } from "../../../store";
import { getDate, getFormatDate, getPhotoTags } from "./helper";
import Skeleton from "@material-ui/lab/Skeleton";

/* const useStyles = makeStyles({
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    margin: "auto",
    paddingTop: "20px",
    paddingBottom: "20px",
  },

  title: {
    paddingBottom: "6px",
  },

  tagsWrapper: {
    paddingTop: "20px",
    paddingBottom: "10px",
  },

  tagsContainer: {
    listStyle: "none",
    paddingTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  tagsTitle: {
    textAlign: "center",
  },
  tags: {
    minWidth: "50px",
    padding: "8px",
    color: "violet",
  },

  sceletons: {
    paddingTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  sceleton: {
    marginRight: "8px",
  },
  error: {
    paddingTop: "15px",
    textAlign: "center",
    color: "red",
  },
}); */

interface PhotoDescProps {
  /* 
  tags?: TTagsData;
  tagsError?: boolean;
  tagsLoading?: boolean; */
  photo: TPhotoData;
  tagsState: ITagsState;
  showEditPhotoForm?: (photo: TPhotoData) => void;
}

export const getTags = (
  tagsState: ITagsState,
  photoTags: { [id: string]: boolean },

  classes: any
) => {
  let content = null;

  if (tagsState.loading) {
    content = (
      <div className={classes.sceletons}>
        <Skeleton className={classes.skeleton} width={90} height={30} />
        <Skeleton className={classes.skeleton} width={90} height={30} />
        <Skeleton className={classes.skeleton} width={90} height={30} />
        <Skeleton className={classes.skeleton} width={90} height={30} />
      </div>
    );
  } else if (tagsState.error) {
    content = <p className={classes.error}> Упс, тэги не загрузились...</p>;
  } else {
    let tags = getPhotoTags(tagsState.tags, photoTags);

    const tagsElements = tags.map((tag, index) => {
      return (
        <li
          key={`${tag.id}_${index}`}
          className={classes.tags}
        >{`#${tag.title}`}</li>
      );
    });

    content = <ul className={classes.tagsContainer}>{tagsElements}</ul>;
  }

  return (
    <div className={classes.tagsWrapper}>
      <h4 className={classes.tagsTitle}>Тэги:</h4>
      {content}
    </div>
  );
};

export const PhotoDesc = ({
  //photo,
  /*  tags,
  tagsError,
  tagsLoading, */
  photo,
  tagsState,
  showEditPhotoForm,
}: PhotoDescProps) => {
  //const classes = useStyles();

  //console.log("[PRE RENDER PHOTO DESC] ", date, typeof date);
  const tagsElements = getTags(tagsState, photo.photo.tags, classes);

  const finalDate = getDate(photo.photo.date);

  const formatDate = getFormatDate(finalDate);

  const onEdit = () => showEditPhotoForm(photo);

  console.log("[RENDER PHOTO DESC WIDGET] ", finalDate);

  return (
    <>
      <Typography className={classes.title} align="left" variant="h5">
        Дата:
      </Typography>

      <Typography align="left" variant="body1">
        {formatDate}
      </Typography>

      <br />

      {photo.photo.description && (
        <>
          <Typography className={classes.title} align="center" variant="h5">
            Описание:
          </Typography>

          <Typography align="center" variant="body1">
            {photo.photo.description}
          </Typography>
        </>
      )}

      {tagsElements}

      <div className={classes.buttons}>
        <Button onClick={onEdit} variant="outlined" color="primary">
          Изменить
        </Button>
      </div>
    </>
  );
};

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    //photo: state.modal.photo,
    tags: state.tags.tags,
    tagsError: state.tags.error,
    tagsLoading: state.tags.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showEditPhotoForm: (photo: TPhotoData) => dispatch(showEditFormAC(photo)),
    /*  fetchData: () => {
      //console.log("onClick");
      dispatch(fetchTagsAC());
    }, /
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDesc); */

export default PhotoDesc;
