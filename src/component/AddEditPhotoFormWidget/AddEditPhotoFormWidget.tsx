import React from "react";
import classes from "./AddEditPhotoFormWidget.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DatePicker from "../FormElements/DatePicker/DatePicker";
//import { dateRules, descRules, photoFileRules, tagsRules } from "../rules";
import UploadButton from "../FormElements/UploadButton/UploadButton";
import TagsCheckbox from "../FormElements/TagsCheckbox/TagsCheckbox";
import { Typography } from "@material-ui/core";

//import { useMutation } from "@apollo/client";

export interface IAddEditPhotoFormData {
  desc: string;
  date: Date;
  photoFile: FileList;
  tags: { [name: string]: boolean };
}

interface AddEditPhotoFormWidgetProps {
  title?: string;
  errors: any;
  register: any;
  handleSubmit: any;
  onSubmit: any;
  photoFileRules: any;
  dateRules: any;
  tagsRules: any;
  setValue: any;
  clearError: any;
  watch: any;
  descRules: any;
  loading: any;
  defaultTagsIds?: string[];
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
  errors,
  register,
  handleSubmit,
  onSubmit,
  photoFileRules,
  dateRules,
  tagsRules,
  setValue,
  clearError,
  watch,
  descRules,
  loading,
  defaultTagsIds,
}: AddEditPhotoFormWidgetProps) => {
  //const classes = useStyles();
  const titleElement = getTitle(title);
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {titleElement}
      <div className={classes.element}>
        <UploadButton
          register={register}
          rules={photoFileRules}
          error={errors.photoFile}
          disabled={false}
        />
      </div>

      <div className={classes.element}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            register={register}
            rules={dateRules}
            error={errors.date}
            disabled={false}
            watch={watch}
            setValue={setValue}
            clearError={clearError}
          />
        </MuiPickersUtilsProvider>
      </div>

      <div className={classes.element}>
        <TagsCheckbox
          label={"Добавьте тэги к фоте:"}
          register={register}
          rules={tagsRules}
          setValue={setValue}
          watch={watch}
          clearError={clearError}
          error={errors.tags}
          disabled={false}
          defaultTagsIds={defaultTagsIds}
        />
      </div>

      <div className={classes.element}>
        <TextField
          name="desc"
          inputRef={register(descRules)}
          id="outlined-multiline-static"
          label="Небольшое необязательное описание."
          error={errors.desc ? true : false}
          helperText={errors.desc && errors.desc.message}
          fullWidth
          multiline
          disabled={false}
          rows={3}
          variant="outlined"
        />
      </div>

      {loading && (
        <div className={classes.linearProgress}>
          <LinearProgress variant="query" />
        </div>
      )}

      <div className={classes.submit}>
        <Button
          disabled={false}
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
