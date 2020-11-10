import React, { useEffect } from "react";
import classes from "./TagsCheckbox.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import Skeleton from "@material-ui/lab/Skeleton";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { IGlobalState } from "../../../store/types";
import { fetchTagsAC } from "../../../store";
import { connect } from "react-redux";
//import { initTagsState, TAGS_STATE } from "./helper";
import { TTagsData } from "./../../../store/types";

//import gql from "graphql-tag";
//import { ApolloError } from "";

export interface ICheckboxItemData {
  //_id: string;
  title: string;
  name: string;
}

interface ITagsCheckboxProps {
  //global state
  items?: TTagsData;
  queryError?: boolean;
  loading?: boolean;
  fetchData?: () => void;
  //local state
  itemsState: any;
  onChange: any;
  disabled: boolean;
  error: any;
  label: string;
  //setInitState: (initState: TAGS_STATE) => void | undefined;
  //defaultTagsIds?: string[];
}

export const getCheckboxes = (
  handleChange: (event: any) => void,
  state: { [name: string]: boolean },
  loading: boolean,
  queryError: boolean,
  disabled: boolean,
  items?: TTagsData
) => {
  console.log("[getCheckboxes]");
  if (
    loading ||
    queryError ||
    !state ||
    !items
    //state[items.keys()[0]] === undefined
  ) {
    //console.log("[getCheckboxes]", items ? items.keys() : "No");
    return [1, 2, 3, 4, 5, 6, 7].map(value => {
      return (
        <div key={classes.container + value} className={classes.container}>
          <Skeleton className={classes.skeleton} width={20} height={30} />
          <Skeleton className={classes.skeleton} width={65} height={30} />
        </div>
      );
    });
  }

  //console.log("[getCheckboxes] RENDER DATA");
  /* if (items && items.size > 0) {
    return items.map((item, index) => {
      return (
        <FormControlLabel
          key={item._id + index}
          control={
            <Checkbox
              checked={state[item._id]}
              onChange={handleChange}
              name={item._id}
              disabled={disabled}
            />
          }
          label={item.title}
        />
      );
    });
  } */

  if (items && items.size > 0) {
    const tagsElements = [];
    items.forEach((data, id) => {
      tagsElements.push(
        <FormControlLabel
          key={id + data.name}
          control={
            <Checkbox
              checked={state[id]}
              onChange={handleChange}
              name={id}
              disabled={disabled}
            />
          }
          label={data.title}
        />
      );
    });
    console.log("[getCheckboxes]", tagsElements.length);
    return tagsElements;
  }

  return undefined;
};

export const TagsCheckbox = ({
  items,
  queryError,
  loading,
  fetchData,
  //
  itemsState,
  onChange,
  disabled,
  error,
  label,
}: //setInitState,
//defaultTagsIds,
ITagsCheckboxProps) => {
  //const classes = useStyles();

  useEffect(() => {
    //console.log("useEffect - fetchData");
    if (!fetchData) throw new Error("No fetch tags func.");
    fetchData();
  }, []);

  /*  useEffect(() => {
    console.log("useEffect - initState", items);
    if (items) initTagsState(setInitState, items, defaultTagsIds);
  }, [items]); */

  const checkboxes = getCheckboxes(
    onChange,
    itemsState,
    loading,
    queryError,
    disabled,
    items
  );

  //loading, data, queryError, tagsState
  console.log("[RENDER] TagsCheckbox ", items, itemsState);

  return (
    <div className={classes.root}>
      <FormControl
        fullWidth
        variant="filled"
        component="fieldset"
        error={error ? true : false}
        className={classes.formControl}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup className={classes.formGroup}>{checkboxes}</FormGroup>
        <FormHelperText>{error && error.message}</FormHelperText>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.tags.tags,
    queryError: state.tags.error,
    loading: state.tags.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      //console.log("onClick");
      dispatch(fetchTagsAC());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsCheckbox);
