import React, { useEffect } from "react";
import { action } from "@storybook/addon-actions";
import TagsCheckbox, { getCheckboxes, TAGS } from ".";
import classes from "./TagsCheckbox.module.scss";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useForm } from "react-hook-form";
import { tagsRules } from "../../../container/forms/Photo.rules";
import { MockedProvider } from "@apollo/client/testing";
//import { useQuery, ApolloError } from "@apollo/client";
import { useTags } from "../../../hooks/photos/useTags";
import {
  tagsData,
  mockQueriesData,
  state,
  defaultTagsIds,
} from "../../../hooks/photos/useTags.mock";

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
    clearError,
    watch,
    errors,
  } = useForm();

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
    clearError("tags");
    setValue("tags", newState);
    //setState(newState);
  };

  const { data, loading, error: queryError } = useTags(initState =>
    setValue("tags", initState)
  );

  console.log("RENDER TAGS STORIES FORM", data ? true : undefined, loading);

  return (
    <form onSubmit={handleSubmit(data => console.log("SUBMIT", data))}>
      <TagsCheckbox
        label={"Choose fucking tags:"}
        items={data ? data.tags : data}
        itemsState={tagsState}
        loading={loading}
        queryError={queryError}
        onChange={onCheckboxChange}
        error={errors.tags}
        disabled={false}
      />
      <br />
      <button type="submit">Go</button>
    </form>
  );
};

export const Default = () => {
  return (
    <MockedProvider mocks={mockQueriesData} addTypename={true}>
      <Form />
    </MockedProvider>
  );
};

export const LoadingTags = () => {
  const checkboxes = getCheckboxes(
    () => {},
    state,
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
    state,
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
