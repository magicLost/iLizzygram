import React from "react";
//import classes from './SearchPhotoForm.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import TagsCheckbox from "../../../component/FormElements/TagsCheckbox";
import { useSearchPhoto } from "./hook";

interface SearchPhotoFormProps {
  title: string;
  onSetSearchState?: () => void | undefined;
}

const useStyles = makeStyles({
  root: {
    minWidth: "350px",
    maxWidth: "650px",
  },
  title: {
    textAlign: "center",
    //textTransform: "uppercase",
    paddingBottom: "15px",
  },
  element: {
    width: "100%",
    paddingBottom: "15px",
  },
  submit: {
    paddingTop: "6px",
  },
  fieldset: {
    paddingTop: "10px",
  },
  formGroup: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
  },
});

const SearchPhotoForm = ({ title, onSetSearchState }: SearchPhotoFormProps) => {
  const classes = useStyles();

  const {
    onTagsCheckboxChange,
    tagsState,
    tagsData,
    tagsLoading,
    queryError,

    handleChange,
    isSortDescValue,

    onSubmit,
    formErrors,
  } = useSearchPhoto(onSetSearchState);

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      {/* <h5 className={classes.title}>Поиск фотос по тэгам</h5> */}
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.element}>
        <FormControl
          fullWidth
          variant="filled"
          component="fieldset"
          error={false}
          className={classes.fieldset}
        >
          <FormLabel component="legend">{"Сортировать:"}</FormLabel>
          <FormGroup className={classes.formGroup}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSortDescValue}
                  onChange={handleChange}
                  name={"isSortDesc"}
                  disabled={false}
                />
              }
              label={"cначала новые"}
            />
          </FormGroup>
        </FormControl>
      </div>
      <div className={classes.element}>
        <TagsCheckbox
          label={"Выберите тэги:"}
          items={tagsData ? tagsData.tags : undefined}
          itemsState={tagsState}
          onChange={onTagsCheckboxChange}
          queryError={queryError ? true : false}
          error={formErrors.tags}
          loading={tagsLoading}
          disabled={false}
        />
      </div>

      <div className={classes.submit}>
        <Button
          disabled={false}
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
        >
          Искать
        </Button>
      </div>
    </form>
  );
};

export default SearchPhotoForm;
