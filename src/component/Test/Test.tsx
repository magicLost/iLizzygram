import React, { useEffect, useRef } from "react";
//import { ALERT } from "../../../apolloClient/queries";
//import { useQuery, useMutation } from "@apollo/react-hooks";
import classes from "./Test.module.scss";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
//import { MockedProvider } from "@apollo/client/testing";
import { IAlertState, alertVar } from "../../apolloClient/cache";
import { ALERT } from "../../apolloClient/queries";
/*tags {
          _id
          name
        } */

const Test = () => {
  const alertState = useQuery(ALERT);

  console.log("[TEST RENDER] ", alertState.data);

  return (
    <>
      <p>{JSON.stringify(alertState.data)}</p>
      {/* <button
        onClick={() => {
          const prevItems = testItems();
          testItems({ one: "two", two: "three" });
        }}
      >
        Change state from Test
      </button> */}
    </>
  );
};

export default Test;
