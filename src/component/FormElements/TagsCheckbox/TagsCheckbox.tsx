import React, { useEffect, useState } from "react";
import classes from "./TagsCheckbox.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import Skeleton from "@material-ui/lab/Skeleton";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { useQuery, ApolloError } from "@apollo/client";
import gql from "graphql-tag";
//import { ApolloError } from "";

export interface ITag {
  _id: string;
  title: string;
  name: string;
}

interface ITagsCheckboxProps {
  register: any;
  rules: any;
  setValue: (name: string, data: any) => void;
  watch: (stateName: string) => { [tag_id: string]: boolean };
  clearError: (name: string) => void;
  disabled: boolean;
  error: any;
  label: string;
  defaultTagsIds?: string[];
}

export const TAGS = gql`
  {
    tags {
      _id
      name
      title
    }
  }
`;

export const getCheckboxes = (
  data: any,
  handleChange: (event: any) => void,
  state: { [name: string]: boolean },
  loading: boolean,
  queryError: ApolloError,
  disabled: boolean
) => {
  console.log("[getCheckboxes]");
  if (
    loading ||
    queryError ||
    !state ||
    state[data.tags[0]._id] === undefined
  ) {
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
  if (data && data.tags) {
    return data.tags.map((tag, index) => {
      return (
        <FormControlLabel
          key={tag._id + index}
          control={
            <Checkbox
              checked={state[tag._id]}
              onChange={handleChange}
              name={tag._id}
              disabled={disabled}
            />
          }
          label={tag.title}
        />
      );
    });
  }
};

const TagsCheckbox = ({
  register,
  setValue,
  watch,
  clearError,
  disabled,
  error,
  rules,
  label,
  defaultTagsIds,
}: ITagsCheckboxProps) => {
  //const classes = useStyles();

  useEffect(() => {
    register({ name: "tags", type: "custom" }, rules);
  }, [register]);

  // tagsState = { tag_id: boolean } - in input checkbox we use name={tag._id}
  const tagsState = watch("tags");

  const { data, loading, error: queryError } = useQuery(TAGS, {
    onCompleted: data => {
      const initState: { [name: string]: boolean } = {};
      const length = defaultTagsIds ? defaultTagsIds.length : 0;
      let tagsMarked = 0;
      data.tags.forEach(tag => {
        if (length > 0 && tagsMarked < length) {
          /*  console.log(
            "TAGS DEFAULT STATE CALC",
            length,
            tagsMarked,
            defaultTagsIds.includes(tag._id)
          ); */
          if (defaultTagsIds.includes(tag._id)) {
            initState[tag._id] = true;
            tagsMarked++;
          } else {
            initState[tag._id] = false;
          }
        } else {
          initState[tag._id] = false;
        }
      });
      //console.log("TAGS DEFAULT STATE", initState);
      setValue("tags", initState);
      //setState(initState);
    },
  });

  const handleChange = (event: any) => {
    //console.log("handleDateChange", event.target);
    //const newState = { ...state, [event.target.name]: event.target.checked };
    const newState = {
      ...tagsState,
      [event.target.name]: event.target.checked,
    };
    clearError("tags");
    setValue("tags", newState);
    //setState(newState);
  };

  const checkboxes = getCheckboxes(
    data,
    handleChange,
    //state,
    tagsState,
    loading,
    queryError,
    disabled
  );

  //loading, data, queryError, tagsState
  console.log("[RENDER] TagsCheckbox ");

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
      {/* 
      <button onClick={() => console.log(watch("tags"))}>See</button> */}
    </div>
  );
};

export default TagsCheckbox;
