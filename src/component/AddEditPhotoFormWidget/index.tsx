import React from "react";
import classes from "./AddEditPhotoFormWidget.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

import UploadButton from "../FormElements/UploadButton";
import TagsCheckbox from "../FormElements/TagsCheckbox";
import { Typography } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import DatePicker from "../FormElements/DatePicker";

//import { photoFileRules, descRules } from "./../Photo.rules";

interface AddEditPhotoFormWidgetProps {
  title?: string;
  formErrors: any;
  register: any;
  onSubmit: any;
  photoFileRules: any;
  descRules: any;
  uploadLoading: boolean;
  dateValue: Date;
  onDateChange: (date: Date) => void | undefined;
  onTagsCheckboxChange: any;
  tagsState: any;
  tagsData: any;
  tagsLoading: any;
  tagsQueryError: any;
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const getTitle = (title?: string) => {
  if (!title) return null;

  return (
    <div className={classes.title}>
      <Typography variant="h5">{title}</Typography>
    </div>
  );
};

const AddEditPhotoFormWidget = ({
  title,
  formErrors,
  register,
  onSubmit,
  photoFileRules,
  descRules,
  uploadLoading,
  dateValue,
  onDateChange,
  onTagsCheckboxChange,
  tagsState,
  tagsData,
  tagsLoading,
  tagsQueryError,
}: AddEditPhotoFormWidgetProps) => {
  //const classes = useStyles();
  const titleElement = getTitle(title);
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      {titleElement}
      <div className={classes.element}>
        <UploadButton
          name="photoFile"
          title="Добавить фоту"
          inputRef={register(photoFileRules)}
          error={formErrors.photoFile}
          disabled={uploadLoading}
        />
      </div>

      <div className={classes.element}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            name="date"
            label="Когда сделан снимок(примерно)."
            error={formErrors.date}
            value={dateValue}
            onChange={onDateChange}
            disabled={uploadLoading}
          />
        </MuiPickersUtilsProvider>
      </div>

      <div className={classes.element}>
        <TagsCheckbox
          label={"Добавьте тэги к фоте:"}
          onChange={onTagsCheckboxChange}
          queryError={tagsQueryError ? true : false}
          items={tagsData ? tagsData.tags : undefined}
          loading={tagsLoading}
          itemsState={tagsState}
          error={formErrors.tags}
          disabled={uploadLoading}
        />
      </div>

      <div className={classes.element}>
        <TextField
          name="desc"
          inputRef={register(descRules)}
          id="outlined-multiline-static"
          label="Небольшое необязательное описание."
          error={formErrors.desc ? true : false}
          helperText={formErrors.desc && formErrors.desc.message}
          fullWidth
          multiline
          disabled={uploadLoading}
          rows={3}
          variant="outlined"
        />
      </div>

      {uploadLoading && (
        <div className={classes.linearProgress}>
          <LinearProgress variant="query" />
        </div>
      )}

      <div className={classes.submit}>
        <Button
          disabled={uploadLoading}
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
        >
          Отправить
        </Button>
      </div>
    </form>
  );
};

export default AddEditPhotoFormWidget;
