import React from "react";
import { action } from "@storybook/addon-actions";
import TagsCheckbox, { getCheckboxes, TAGS } from "./TagsCheckbox";
import classes from "./TagsCheckbox.module.scss";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useForm } from "react-hook-form";
import { tagsRules } from "../../../container/forms/rules";
import { MockedProvider } from "@apollo/client/testing";

export default {
  component: TagsCheckbox,
  title: "FormElements/TagsCheckbox",
  decorators: [
    (story) => (
      <div style={{ width: "500px", margin: "auto", paddingTop: "20px" }}>
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const tagsData = [
  { _id: "123wsdf347423", title: "на улице", name: "street" },
  { _id: "123wsdf343423", title: "улыбка", name: "smile" },
  { _id: "123wsdd343423", title: "дача", name: "dacha" },
  { _id: "123wsdfj43423", title: "на природе", name: "nature" },
  { _id: "123wsdf34df23", title: "дома", name: "home" },
  { _id: "12wwsdf343423", title: "с петами", name: "pets" },
];

export const mockQueriesData = [
  {
    request: {
      query: TAGS,
    },
    result: {
      data: {
        tags: tagsData,
      },
    },
  },
];

const state = {
  "123wsdf347423": false,
  "123wsdf343423": false,
  "123wsdd343423": false,
  "123wsdfj43423": false,
  "123wsdf34df23": false,
  "12wwsdf343423": false,
};

export const Default = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    errors,
  } = useForm();

  return (
    <MockedProvider mocks={mockQueriesData} addTypename={true}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <TagsCheckbox
          label={"Choose fucking tags:"}
          register={register}
          rules={tagsRules}
          setValue={setValue}
          watch={watch}
          clearError={clearError}
          error={errors.tags}
          disabled={false}
          defaultTagsIds={["123wsdfj43423", "12wwsdf343423"]}
        />
        <br />
        <button type="submit">Go</button>
      </form>
    </MockedProvider>
  );
};

export const LoadingTags = () => {
  const checkboxes = getCheckboxes(
    { tags: tagsData },
    () => {},
    state,
    true,
    null,
    false
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
    { tags: tagsData },
    () => {},
    state,
    false,
    null,
    false
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
