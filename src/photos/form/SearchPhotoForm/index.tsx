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
import { useSearch } from "./hook";
import { IGlobalState, TTagsData } from "./../../../store/types";
import { connect } from "react-redux";
import { ISearchState } from "../../types";
//import AgeSlider from "../../../component/FormElements/AgeSlider";
import AgeSelect from "../../../component/FormElements/AgeSelect";
import { lizzyYearsOld } from "../../../config";
import { setSearchStateAC } from "../../store/action/search";
import { fromFormDataToState } from "./helper";

interface SearchPhotoFormProps {
  title: string;
  state?: ISearchState;
  tagsData?: TTagsData;
  onSetSearchState?: Function;
  setSearchState?: (state: ISearchState) => void | undefined;
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
  tags: {
    width: "100%",
    paddingBottom: "15px",
  },
  ages: {
    width: "100%",
    paddingBottom: "25px",
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

export const SearchPhotoForm = ({
  title,
  state,
  tagsData,
  setSearchState,
  onSetSearchState,
}: SearchPhotoFormProps) => {
  const classes = useStyles();

  const {
    tagsProps,

    onAgeSelectChange,
    /*  handleCheckboxChange,
    handleSliderChange,

    isSortDescValue, */
    agesValue,

    handleSubmit,
    formErrors,
  } = useSearch(state, tagsData);

  const submit = handleSubmit(formData => {
    const newSearchState = fromFormDataToState(formData);

    console.log("SUBMIT", newSearchState);

    setSearchState(newSearchState);

    if (onSetSearchState) onSetSearchState();
  });

  return (
    <form className={classes.root} onSubmit={submit}>
      {/* <h5 className={classes.title}>Поиск фотос по тэгам</h5> */}
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      {/*  <div className={classes.element}>
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
                  onChange={handleCheckboxChange}
                  name={"isSortDesc"}
                  disabled={false}
                />
              }
              label={"cначала новые"}
            /> 
          </FormGroup>
        </FormControl>
      </div> */}
      <div className={classes.ages}>
        <AgeSelect value={agesValue} onChange={onAgeSelectChange} />
      </div>

      <div className={classes.tags}>
        <TagsCheckbox
          label={"Выберите тэги:"}
          itemsState={tagsProps.tagsState}
          onChange={tagsProps.onTagsCheckboxChange}
          error={formErrors.tags}
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

const mapStateToProps = (state: IGlobalState) => {
  return {
    state: state.search,
    tagsData: state.tags.tags,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchState: (state: ISearchState) => {
      dispatch(setSearchStateAC(state));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPhotoForm);
