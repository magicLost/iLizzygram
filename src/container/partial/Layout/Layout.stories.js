import React from "react";
import { action } from "@storybook/addon-actions";
import Layout from "./Layout";
import { MockedProvider } from "@apollo/client/testing";
import { mockQueriesData } from "../Header/Header.stories";
import { cache } from "../../../apolloClient/cache";
import {
  showAlert,
  showLoginForm,
} from "../../../hooks/cache/cache.controller";
import Box from "@material-ui/core/Box";

export default {
  component: Layout,
  title: "Pages/Layout",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <MockedProvider mocks={mockQueriesData} cache={cache} addTypename={false}>
      <>
        <Layout>
          <Box maxWidth="1100px" paddingTop="0px">
            <button onClick={showLoginForm}>Show login form</button>
            <button
              onClick={() => showAlert("info", "Hello from alert, fukka")}
            >
              Show alert
            </button>
          </Box>
        </Layout>
      </>
    </MockedProvider>
  );
};
