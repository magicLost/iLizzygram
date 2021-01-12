import { useAuth } from "./useAuth";
import { authLocalStorageKey, usersCollectionName } from "../../config";
import { authAC } from "./../store/action";
import { useDispatch } from "react-redux";
import { useEffect, Dispatch } from "react";
import { getFirestoreDb } from "./../../firebase/initFirestore";
import { IAuthUser } from "../../types";

export const useEditor = () => {
  const dispatch = useDispatch();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && user.isEditor === undefined) {
      const savedUser = localStorage.getItem(authLocalStorageKey);

      if (savedUser) {
        const prevUser = JSON.parse(savedUser);

        if (prevUser.uid === user.uid) {
          //user.isEditor = prevUser.isEditor;
          dispatch(
            authAC({
              ...user,
              isEditor: prevUser.isEditor,
            })
          );
        } else {
          setIsEditorAndSave(user, dispatch);
        }
      } else {
        setIsEditorAndSave(user, dispatch);
      }
    }
  }, [user]);

  return {
    user,
    loading,
  };
};

const setIsEditorAndSave = async (user: IAuthUser, dispatch: Dispatch<any>) => {
  try {
    //const prevIsEditor = refNewUser.isEditor;

    const res = await getFirestoreDb()
      .collection(usersCollectionName)
      .doc(user.uid)
      .get();

    const isEditor = res.exists;

    //if (refNewUser.isEditor !== prevIsEditor) dispatch(authAC(refNewUser));

    dispatch(authAC({ ...user, isEditor }));

    localStorage.setItem(
      authLocalStorageKey,
      JSON.stringify({ ...user, isEditor })
    );
  } catch (err) {
    console.error("BAD REQUEST IS EDITOR", err);
  }
};
