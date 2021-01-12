import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/auth";
import PhotoTab from "./PhotoTab";

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "ru";

export default {
  component: PhotoTab,
  title: "Auth/GoogleAuth",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const singinPopUp = async () => {
  try {
    const res = await firebase.auth().signInWithPopup(provider);
    //var token = res.credential.;
    // The signed-in user info.
    var user = res.user;
    console.log("SUCCESS", user);
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log("ERROR", errorMessage);
  }
};

const signinRedirect = async () => {
  try {
    firebase.auth().signInWithRedirect(provider);

    const res = await firebase.auth().getRedirectResult();
    //var token = res.credential.accessToken;
    // The signed-in user info.
    var user = res.user;
    console.log("SUCCESS", user.email);
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log("ERROR", errorMessage);
  }
};

const signout = async () => {
  try {
    await firebase.auth().signOut();

    console.log("SUCCESS SINGOUT");
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const Default = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          setUser({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          });

          // ...
        } else {
          // User is signed out.
          // ...
          setUser(undefined);
        }
      },
      err => {
        setUser(undefined);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Button onClick={signout}>Sign out.</Button>
      <Button onClick={singinPopUp}>Sign in with Google account(popup).</Button>
      <Button onClick={signinRedirect}>
        Sign in with Google account(redirect).
      </Button>

      {!user && <p>No user</p>}

      {user && (
        <div>
          <p>Name - {user.displayName}</p>
          <p>Email - {user.email}</p>
          <p>UID - {user.uid}</p>
        </div>
      )}
    </>
  );
};
