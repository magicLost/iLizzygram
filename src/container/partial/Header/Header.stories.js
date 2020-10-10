import React from "react";
//import { action } from "@storybook/addon-actions";
import Header from ".";
//import { MockedProvider } from "@apollo/client/testing";
//import { LOGOUT } from "./../../../hooks/auth/auth.queries";
//import { cache, authVar } from "../../../apolloClient/cache";
import Logo from "../../../component/Logo/PureLogo";

/* export const mockQueriesData = [
  {
    request: {
      query: LOGOUT,
    },
    result: async () => {
      console.log("Response AUTH_USER");
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: {
              logout: true,
            },
          });
        }, 1000);
      });
    },
  },
];
 */
export default {
  component: Header,
  title: "Pages/Header",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const NotAuth = () => {
  return (
    <>
      <Header Logo={Logo} user={undefined} loading={false} logout={() => {}} />
    </>
  );
};

export const LoadingAuth = () => {
  return (
    <>
      <Header Logo={Logo} user={undefined} loading={true} logout={() => {}} />
    </>
  );
};

export const Auth = () => {
  return (
    <>
      <Header
        Logo={Logo}
        user={{ name: "Sia", role: "princess" }}
        loading={false}
        logout={() => console.log("LOGOUT")}
      />
    </>
  );
};

/* export const Default = () => {
  return (
    <MockedProvider mocks={mockQueriesData} cache={cache} addTypename={false}>
      <>
        <Header />
        <br />
        <button
          onClick={() =>
            authVar({ user: { name: "КирНат", role: "user" }, loading: false })
          }
        >
          Login as КирНат
        </button>
      </>
    </MockedProvider>
  );
}; */
