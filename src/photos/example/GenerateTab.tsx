import React from "react";
//import "firebase/firebase-firestore";
import { getAll, generateAndSavePhotosData } from "../helper";
import Button from "@material-ui/core/Button";
import { getFirestoreDb } from "./../../firebase/initFirestore";

const GenerateTab = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h4>Generate and save fake data.</h4>
      <Button
        onClick={async () => {
          const tags = await getAll(getFirestoreDb().collection("tags"));

          await generateAndSavePhotosData(
            getFirestoreDb().collection("photos"),
            tags
          );

          console.log("SUCCESS GENERATE AND SAVE PHOTOS");
        }}
      >
        Generate and save photos
      </Button>
    </div>
  );
};

export default GenerateTab;
