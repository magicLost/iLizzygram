import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import ErrorBoundary from ".";

export default {
  component: ErrorBoundary,
  title: "ErrorBoundary",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const ErrorComponent = () => {
  throw new Error("Big Error");
  return null;
};

export const Default = () => {
  return (
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );
};
