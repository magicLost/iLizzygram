import React from "react";
//import classes from './PhotoDesc.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ImageSharp from "../UI/ImageSharp";
//import ImageWithDesc from "../UI/ImageWithDesc/ImageWithDesc";
import TransitionsModal from "../Modal/TransitionModal/TransitionModal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { ITag } from "../FormElements/TagsCheckbox/TagsCheckbox";
import { modalVar } from "../../apolloClient/cache";
import { IPhoto } from "../../../server/api/entity/Photo/Photo.model";

//import classes from "*.module.css";

const useStyles = makeStyles({
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

  tagsContainer: {
    listStyle: "none",
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
});

interface PhotoDescProps {
  tags: ITag[];
  date: Date | number | string;
  desc: string;
  //onEditPhoto: () => void | undefined;
  photo: IPhoto;
}

const getMonth = (date: Date) => {
  const month = date.getMonth();
  switch (month) {
    case 0:
      return "января";
    case 1:
      return "февраля";
    case 2:
      return "марта";
    case 3:
      return "апреля";
    case 4:
      return "мая";
    case 5:
      return "июня";
    case 6:
      return "июля";
    case 7:
      return "августа";
    case 8:
      return "сентября";
    case 9:
      return "октября";
    case 10:
      return "ноября";
    case 11:
      return "декабря";

    default:
      throw new Error(`Unknown month number  ${month}`);
  }
};

const getFormatDate = (date: Date) => {
  const day = date.getDate();
  const month = getMonth(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const getDate = (date: Date | number | string): Date => {
  let resultDate = undefined;

  if (date instanceof Date) return date;

  if (typeof date === "string") {
    resultDate = new Date(date);
    if (resultDate.toString() === "Invalid Date")
      resultDate = new Date(parseInt(date));
  } else {
    resultDate = new Date(date);
  }

  if (resultDate.toString() === "Invalid Date")
    throw new Error("Bad date in FinalImageSharp");

  return resultDate;
};

export const getTags = (tags: ITag[], classes: any) => {
  const tagsElements = tags.map((tag, index) => {
    return (
      <li
        key={`${tag._id}_${index}`}
        className={classes.tags}
      >{`#${tag.title}`}</li>
    );
  });

  return (
    <div>
      <h4 className={classes.tagsTitle}>Тэги:</h4>
      <ul className={classes.tagsContainer}>{tagsElements}</ul>
    </div>
  );
};

const PhotoDesc = ({ tags, date, desc, photo }: PhotoDescProps) => {
  const classes = useStyles();

  //console.log("[PRE RENDER PHOTO DESC] ", date, typeof date);
  const tagsElements = getTags(tags, classes);

  const finalDate = getDate(date);

  const formatDate = getFormatDate(finalDate);

  const onEditPhoto = () => {
    modalVar({
      ...modalVar(),
      openEditForm: true,
      photo,
    });
  };

  console.log("[RENDER PHOTO DESC] ", finalDate);
  return (
    <>
      <Typography className={classes.title} align="left" variant="h5">
        Дата:
      </Typography>

      <Typography align="left" variant="body1">
        {formatDate}
      </Typography>

      <br />

      <Typography className={classes.title} align="center" variant="h5">
        Описание:
      </Typography>

      <Typography align="center" variant="body1">
        {desc}
      </Typography>

      {tagsElements}

      <div className={classes.buttons}>
        <Button onClick={onEditPhoto} variant="outlined" color="primary">
          Изменить
        </Button>
      </div>
    </>
  );
};

export default PhotoDesc;
