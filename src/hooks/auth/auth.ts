import {
  useApolloClient,
  useMutation,
  ApolloClient,
  useQuery,
} from "@apollo/client";
import { IUserResponseToClient } from "./../../../server/api/entity/User/User.model";
import {
  authVar,
  alertVar,
  modalVar,
  localStorageKey,
} from "../../apolloClient/cache";

import { onSuccessLogin } from "./auth.helper";
import { LOGIN, LOGOUT, AUTH } from "./auth.queries";
//import {  } from "./../cache/cache.controller";

//check if exists saved user in query cache
//check if exists saved user in local storage
//save user to query cache
//send request to isLogIn

//const localStorageKey = "lg_super_puper_user";

// RESPONSE DATA

export interface ILoginResponseData {
  login: IUserResponseToClient;
}

export interface IAuthUserResponseData {
  authUser: IUserResponseToClient;
}

// HOOKS

export const useLogin = () => {
  const [login, { data, loading }] = useMutation<ILoginResponseData>(LOGIN, {
    onCompleted: (data) => {
      /*show success alert*/
      onSuccessLogin(data.login);
      //hide form();
      console.log("[COMPLETE]", data);
    },
    onError: (err) => {
      /*show error alert*/
      console.error("BAD LOGIN", err.message);
    },
  });

  return {
    login,
    loading,
  };
};

// AUTH

//WE STORE USER IN LOCAL STORAGE AND IF IT NOT THERE
//WE CALL AUTH_USER_QUERY AND SAVE RESULT TO LOCAL STORAGE
export const useAuthUser = () => {
  //const client = useApolloClient();

  //let user: IUserResponseToClient | undefined = getSavedUser(client);
  const {
    data: {
      auth: { user, loading },
    },
  } = useQuery(AUTH);

  // CHECK AUTH ON SERVER
  /* const [isAuth, { data, loading, error }] = useMutation<IAuthUserResponseData>(
    AUTH_USER,
    {
      fetchPolicy: "no-cache",

      onCompleted: (data) => {
        localStorage.setItem(localStorageKey, JSON.stringify(data.authUser));
      },
    }
  );

  if (!user && !loading && !error && !data) isAuth();

  if (error || loading) {
    user = undefined;
  } else if (data && data.authUser) {
    user = data.authUser;
  } */

  return {
    user,
    loading,
  };
};

// LOGOUT

export const useLogout = () => {
  const [logout, { loading }] = useMutation<IAuthUserResponseData>(LOGOUT, {
    fetchPolicy: "no-cache",

    //refetchQueries: [{ query: AUTH_USER }],

    onCompleted: () => {
      window.localStorage.removeItem(localStorageKey);

      authVar({
        user: undefined,
        loading: false,
      });
    },

    onError: (err) => {
      //show alert
      alertVar({
        message: "Упс, не удалось выйти из профиля. Попробуйте позже.",
        type: "error",
        isShow: true,
      });
      console.error("SHOW ERROR ALERT", err.message);
    },
  });

  return {
    logout,
    logoutLoading: loading,
  };
};
