import React, { useEffect } from "react";
import { action } from "@storybook/addon-actions";
import { TagsCheckbox, getCheckboxes, TAGS } from ".";
import classes from "./TagsCheckbox.module.scss";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useForm } from "react-hook-form";
import { tagsRules } from "../../../photos/form/Photo.rules";
//import { MockedProvider } from "@apollo/client/testing";
//import { useQuery, ApolloError } from "@apollo/client";
//import { useTags } from "../../../hooks/photos/useTags";
import { tagsData, state as initTagsState, defaultTagsIds } from "./__mock";

export default {
  component: TagsCheckbox,
  title: "FormElements/TagsCheckbox",
  decorators: [
    story => (
      <div style={{ width: "500px", margin: "auto", paddingTop: "20px" }}>
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    errors,
  } = useForm({
    defaultValues: {
      tags: initTagsState,
    },
  });

  useEffect(() => {
    register({ name: "tags", type: "custom" }, tagsRules);
  }, [register]);

  // tagsState = { tag_id: boolean } - in input checkbox we use name={tag._id}
  const tagsState = watch("tags");

  const onCheckboxChange = event => {
    //console.log("handleDateChange", event.target);
    //const newState = { ...state, [event.target.name]: event.target.checked };
    const newState = {
      ...tagsState,
      [event.target.name]: event.target.checked,
    };
    clearErrors("tags");
    setValue("tags", newState);
    //setState(newState);
  };

  console.log("RENDER TAGS STORIES FORM");
  /* items,
  queryError,
  loading,
  fetchData,
  //
  itemsState,
  onChange,
  disabled,
  error,
  setInitState,
  defaultTagsIds, */
  return (
    <form onSubmit={handleSubmit(data => console.log("SUBMIT", data))}>
      <TagsCheckbox
        queryError={false}
        fetchData={() => console.log("fetch data")}
        label={"Choose fucking tags:"}
        items={tagsData}
        itemsState={tagsState}
        loading={false}
        onChange={onCheckboxChange}
        error={errors.tags}
        setInitState={() => console.log("setInitState")}
        defaultTagsIds={defaultTagsIds}
        disabled={false}
      />
      <br />
      <button type="submit">Go</button>
    </form>
  );
};

export const Default = () => {
  return <Form />;
};

export const LoadingTags = () => {
  const checkboxes = getCheckboxes(
    () => {},
    initTagsState,
    true,
    null,
    false,
    tagsData
  );

  return (
    <div className={classes.root}>
      <FormControl
        fullWidth
        variant="filled"
        component="fieldset"
        error={false}
        className={classes.formControl}
      >
        <FormLabel component="legend">{"Добавьте тэги к фоте:"}</FormLabel>
        <FormGroup className={classes.formGroup}>{checkboxes}</FormGroup>
        <FormHelperText>{""}</FormHelperText>
      </FormControl>
    </div>
  );
};

export const Tags = () => {
  const checkboxes = getCheckboxes(
    () => {},
    initTagsState,
    false,
    null,
    false,
    tagsData
  );

  return (
    <div className={classes.root}>
      <FormControl
        fullWidth
        variant="filled"
        component="fieldset"
        error={false}
        className={classes.formControl}
      >
        <FormLabel component="legend">{"Добавьте тэги к фоте:"}</FormLabel>
        <FormGroup className={classes.formGroup}>{checkboxes}</FormGroup>
        <FormHelperText>{""}</FormHelperText>
      </FormControl>
    </div>
  );
};
