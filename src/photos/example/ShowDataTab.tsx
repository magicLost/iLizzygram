import React, { useEffect } from "react";
import "firebase/firebase-firestore";
import { getAll } from "../helper";
import Button from "@material-ui/core/Button";
import { db } from "../../container/ReduxWrapper";

const ShowDataTab = () => {
  return (
    <div
      style={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h4>Show firestore data.</h4>
      <Button
        onClick={async () => {
          const tags = await getAll(db.collection("tags"));
          console.log("[FIRESTORE] TAGS", tags);
        }}
      >
        Get all tags to console.
      </Button>

      <Button
        onClick={async () => {
          const photos = await getAll(db.collection("photos"));
          console.log("[FIRESTORE] PHOTOS", photos);
        }}
      >
        Get all photos to console.
      </Button>

      <Button
        onClick={async () => {
          /* const photos = await updatePhotosWithTagsArrField(
                db.collection("photos")
              ); */

          const result = await db
            .collection("photos")
            .where("tags.Ql2r2DFzzjZnzP2adh9Z", "==", true)
            .where("yearsOld", "==", 0)
            .orderBy("date")
            .limit(100)
            .get(); //orderBy("_timestamp")
          console.log("SUCCESS GET");
          const res = new Map();

          result.docs.map(item => {
            res.set(item.id, item.data());
          });

          console.log(res);

          //const photosMap = resFirestoreToMapObj(photos);
          //console.log("[FIRESTORE] TEST", photosMap);
        }}
      >
        Test firestore.
      </Button>
    </div>
  );
};

export default ShowDataTab;
