import React from "react";
//import "firebase/firebase-firestore";
import { getAll, generateAndSavePhotosData } from "../helper";
import Button from "@material-ui/core/Button";
import { db } from "../../container/ReduxWrapper";

const GenerateTab = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h4>Generate and save fake data.</h4>
      <Button
        onClick={async () => {
          const tags = await getAll(db.collection("tags"));

          await generateAndSavePhotosData(db.collection("photos"), tags);

          console.log("SUCCESS GENERATE AND SAVE PHOTOS");
        }}
      >
        Generate and save photos
      </Button>
    </div>
  );
};

export default GenerateTab;
