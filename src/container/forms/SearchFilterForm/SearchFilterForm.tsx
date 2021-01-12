import React, { useEffect } from "react";
import TagsCheckbox from "../../../component/FormElements/TagsCheckbox/TagsCheckbox";
//import classes from './SearchFilterForm.module.scss';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
//import { ISearchState } from "../../../pages/.";
import { searchVar } from "../../../apolloClient/cache";

export interface ISearchFilterFormData {
  isSortDesc: boolean;
  tags: { [name: string]: boolean };
}

interface SearchFilterFormProps {
  //tagsIds: string[];
  onSetSearchState: () => void | undefined;
}

const useStyles = makeStyles({
  root: {
    minWidth: "350px",
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

const SearchFilterForm = ({
  onSetSearchState,
}: //tagsIds,
SearchFilterFormProps) => {
  const classes = useStyles();

  const { tagsIds } = searchVar();

  const {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    errors,
  } = useForm<ISearchFilterFormData>({
    defaultValues: {
      isSortDesc: true,
    },
  });

  useEffect(() => {
    register({ name: "isSortDesc", type: "custom" });
  }, [register]);

  const handleChange = (event: any) => {
    //console.log("handleDateChange", event.target);
    //clearError("tags");
    setValue(event.target.name, event.target.checked);
  };

  const onSubmit = ({ isSortDesc, tags }) => {
    const tagsIds = [];
    for (let id in tags) {
      if (tags[id] === true) tagsIds.push(id);
    }

    isSortDesc = isSortDesc === true ? true : false;

    const isSearch = tagsIds.length > 0 || !isSortDesc;

    searchVar({ ...searchVar(), isSortDesc, tagsIds, isSearch });

    onSetSearchState();
  };

  const descByDateState = watch("isSortDesc");

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {/* <h5 className={classes.title}>Поиск фотос по тэгам</h5> */}
      <Typography variant="h5" className={classes.title}>
        Поиск фотографий по тэгам
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
                  checked={descByDateState}
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
          register={register}
          rules={undefined}
          setValue={setValue}
          watch={watch}
          clearError={clearError}
          error={undefined}
          disabled={false}
          defaultTagsIds={tagsIds}
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

export default SearchFilterForm;
