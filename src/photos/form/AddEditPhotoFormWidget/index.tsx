import React from "react";
import classes from "./AddEditPhotoFormWidget.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

import UploadButton from "../../../component/FormElements/UploadButton";
import TagsCheckbox from "../../../component/FormElements/TagsCheckbox";
import { Typography } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import DatePicker from "../../../component/FormElements/DatePicker";
import { IUseUploadPhotoFormReturn } from "../hook";
//import { photoFileRules, descRules } from "./../Photo.rules";

interface IAddEditPhotoFormWidgetProps {
  title?: string;
  photoFileRules: any;
  descRules: any;
  onSubmit: (...args: any) => void;
  uploadLoading?: boolean;
  //defaultTagsIds?: string[];
  uploadPhotoFormData: IUseUploadPhotoFormReturn;
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
  photoFileRules,
  descRules,
  onSubmit,
  uploadLoading,
  //defaultTagsIds,
  uploadPhotoFormData,
}: IAddEditPhotoFormWidgetProps) => {
  //const classes = useStyles();
  const titleElement = getTitle(title);

  const { formErrors, register, tagsProps, dateProps } = uploadPhotoFormData;
  /* const {
    onTagsCheckboxChange,
    tagsData,
    tagsLoading,
    tagsState,
    queryError: tagsQueryError,
  } = controller.tagsDependencies;
 */
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
            value={dateProps.dateValue}
            onChange={dateProps.onDateChange}
            disabled={uploadLoading}
          />
        </MuiPickersUtilsProvider>
      </div>

      <div className={classes.element}>
        <TagsCheckbox
          label={"Добавьте тэги к фоте:"}
          onChange={tagsProps.onTagsCheckboxChange}
          //setInitState={tagsProps.setTagsInitState}
          itemsState={tagsProps.tagsState}
          //defaultTagsIds={defaultTagsIds}
          error={formErrors.tags}
          disabled={uploadLoading}
        />
      </div>

      <div className={classes.element}>
        <TextField
          name="desc"
          inputRef={register(descRules) as any}
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
