import React, { FC, useEffect } from "react";
import classes from "./TagsCheckbox.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import Skeleton from "@material-ui/lab/Skeleton";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { ITagsState } from "../../../store/types";

export interface ITagsCheckboxProps {
  itemsState: any;
  onChange: any;
  disabled: boolean;
  error: any;
  label: string;
}

export interface ITagsCheckboxDataProps extends ITagsCheckboxProps {
  tagsState: ITagsState;
}

export const getCheckboxes = (
  handleChange: (event: any) => void,
  state: { [name: string]: boolean },
  tagsState: ITagsState,
  disabled: boolean
) => {
  console.log("[getCheckboxes]");
  if (
    tagsState.loading ||
    tagsState.error ||
    !state ||
    !tagsState.tags
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

  if (tagsState.tags && tagsState.tags.size > 0) {
    const tagsElements = [];
    tagsState.tags.forEach((data, id) => {
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

export const TagsCheckbox: FC<ITagsCheckboxDataProps> = ({
  tagsState,
  itemsState,
  onChange,
  disabled,
  error,
  label,
}) => {
  const checkboxes = getCheckboxes(onChange, itemsState, tagsState, disabled);

  console.log("[RENDER TAGS CHECKBOX WIDGET]", tagsState, itemsState);

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

export default TagsCheckbox;
