import React from "react";
import { action } from "@storybook/addon-actions";
//import TestHelper from "./Test.helper.tsx";
import Test from "./Test.tsx";
import { MockedProvider } from "@apollo/client/testing";

const mockQueries = [
  {
    request: {
      query: TEST,
    },
    result: {
      data: {
        tests: [
          { name: "Sia", hello: "Hello", __typename: "Test" },
          { name: "Ken", hello: "Alloha", __typename: "Test" },
        ],
      },
    },
  },
];

export default {
  title: "Test",
  component: Test,
};

export const Default = () => (
  <MockedProvider mocks={mockQueries} addTypename={false}>
    <Test />
  </MockedProvider>
);
