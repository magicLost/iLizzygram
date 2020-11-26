import * as functions from "firebase-functions";
//import { auth } from "firebase-functions";
import { initializeApp, apps, firestore } from "firebase-admin"; //firestore

/* IF WE WANNA USE CLOUD FUNCTION WE MUST UPGRADE OUR BILLING PLAN */

type TRole = "reader" | "editor";

if (!apps.length) initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const createUser = functions.auth.user().onCreate((user, context) => {
  const uid = user.uid;
  //const params = context.params;

  //console.log("USER", JSON.stringify(user));

  const userInfo: { role: TRole } = {
    role: "reader",
  };

  return firestore().collection("users").doc(uid).set(userInfo);
});

export const makeUppercase = functions.firestore
  .document("/messages/{docId}")
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const originalData = snapshot.data();
    //console.log("Uppercasing", context.params.docId, originalData);
    for (let prop in originalData) {
      originalData[prop] = originalData[prop].toUpperCase();
    }

    //console.log("Uppercasing", context.params.docId, originalData);
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.set(originalData);
  });
