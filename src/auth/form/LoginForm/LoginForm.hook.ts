import { useForm } from "react-hook-form";
//import { useLogin } from "../../../hooks/auth/auth";
import { IUserResponseToClient } from "../../../types";

export interface ILoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () =>
  //onSuccessLogin?: (login: IUserResponseToClient) => void | undefined,
  //onLoginError?: () => void | undefined
  {
    const { register, handleSubmit, errors } = useForm<ILoginFormData>();

    //const { login, loading } = useLogin(onSuccessLogin, onLoginError);

    /*   const onSubmit = handleSubmit(({ email, password }) => {
    console.log("SUBMIT", email, password);
    /* login({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    }); 
  }); */

    return {
      register,
      handleSubmit,
      //onSubmit,
      //loading: false, //loading,
      errors,
    };
  };
