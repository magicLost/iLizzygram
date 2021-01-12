import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
//import Test, { PHOTOS } from "../src/component/Test/Test";
import { act } from "react-dom/test-utils";
//import wait from "waait";
import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { ApolloClient } from "@apollo/client";

const alertInitialState = {
  isShow: false,
  type: "SUCCESS",
  message: "",
};

const alertVar = makeVar(alertInitialState);

describe("InMemoryCache", () => {
  test("", () => {
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            alert: {
              read() {
                return alertVar();
              },
            },
          },
        },
      },
    });
    //expect(cache).toEqual("hello");
    const apolloClient = new ApolloClient({
      cache,
      //connectToDevTools: true,
    });

    expect(alertVar()).toEqual({ isShow: false, message: "", type: "SUCCESS" });
  });
});

//it must render logo
//it useAuthUser and then render auth fragment

/*const mockQueries = [
  {
    request: {
      query: PHOTOS,
    },
    result: {
      data: {
        photos: [
          {
            name: "hello.jpg",
          },
          {
            name: "bye.jpg",
          },
        ],
      },
    },
  },
];



 describe("Test", () => {

  let _render = null;

  describe("Render", () => {
    beforeEach(() => {
      _render = render(
        <MockedProvider mocks={mockQueries} addTypename={false}>
          <Test />
        </MockedProvider>
      );
    });

    afterEach(cleanup);

    test("It must render logo and Skeleton", async () => {
      let p = _render.getAllByText("...Loading");
      expect(p).toHaveLength(1);

      await act(async () => {
        await wait(0);
        p = _render.getAllByText('[{"name":"hello.jpg"},{"name":"bye.jpg"}]');
        expect(p).toHaveLength(1);
      });
    });
  });
});
 */
