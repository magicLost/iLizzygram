import { useState } from "react";
//import gql from "graphql-tag";
import { authVar } from "./../../../apolloClient/cache";
//import { useQuery } from "@apollo/client";
import { useAuthUser } from "../../../hooks/auth/auth";

/* export const CSRF = gql`
  query {
    csrf {
      token
    }
  }
`; */

const TestReactiveVar = () => {
  const auth = authVar();
  const [str, setStr] = useState("hello");

  //const { data } = useQuery(AUTH);

  /* const {
    data: {
      auth: { user, loading },
    },
  } = useQuery(AUTH);
 */

  const { user, loading } = useAuthUser();
  return (
    <>
      <p>Parent element - auth - {JSON.stringify(auth)} </p>
      <p>Parent element - auth -{`${JSON.stringify(user)} - ${loading}`}</p>
      <p>str - {str}</p>
      <button
        onClick={() =>
          authVar({ user: { name: "Sia", role: "princess" }, loading: false })
        }
      >
        Change var
      </button>
      <button onClick={() => setStr("hye")}>Change state</button>
      <br />
      <hr />
      <br />
      <Child />
    </>
  );
};

const Child = () => {
  const auth = authVar();
  return <p>Child element - auth - {JSON.stringify(auth)}</p>;
};

export default TestReactiveVar;
