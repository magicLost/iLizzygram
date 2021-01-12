import React, { useState } from "react";
import { getFirestoreDb } from "../../firebase/initFirestore";

const collectionName = "photos";

const GetAllPhotos = () => {
  const [result, setResult] = useState("");
  const onClick = async () => {
    try {
      setResult("...Loading");
      const res = await getFirestoreDb().collection(collectionName).get();
      let newResult = "";
      res.forEach(snap => {
        newResult += `${snap.id} | `;
      });

      setResult(newResult);
    } catch (err) {
      setResult(err.message);
    }
  };
  return (
    <div style={{ padding: "10px" }}>
      <button onClick={onClick}>Get photos</button>
      {result && (
        <p
          style={{
            display: "block",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {result}
        </p>
      )}

      <ul>
        <li>
          <p>We show photos only to auth users</p>
        </li>
      </ul>
    </div>
  );
};

const TryToAddPhoto = () => {
  const [result, setResult] = useState("");
  const onClick = async () => {
    try {
      setResult("...Loading");
      const res = await getFirestoreDb().collection(collectionName).add({
        addedByUserUID: "ULIX6vNVyOYk2v8T1sU9iQv8bT23",
        date: new Date(),
      });

      setResult(`Success | ${res.id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <button onClick={onClick}>Try to add photo</button>
      {result && (
        <p
          style={{
            display: "block",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {result}
        </p>
      )}
      <ul>
        <li>
          <p>Add photo can only users who exists in users collection.</p>
        </li>
      </ul>
    </div>
  );
};

const TryToDeletePhoto = () => {
  const [result, setResult] = useState("");

  const onSubmit = async event => {
    event.preventDefault();
    const id = event.target.querySelector("input[name='photoId']").value;

    //console.log("Submit", id);

    try {
      setResult("...Loading");
      await getFirestoreDb().collection(collectionName).doc(id).delete();

      setResult(`Success deleted | ${id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={onSubmit}>
        <input
          style={{ height: "34px" }}
          type="submit"
          value="Try to delete photo"
        />
        <input
          style={{ marginLeft: "10px" }}
          name="photoId"
          placeholder="Photo id"
        />
      </form>

      {result && (
        <p
          style={{
            display: "block",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {result}
        </p>
      )}
      <ul>
        <li>
          <p>No one can delete photo.</p>
        </li>
      </ul>
    </div>
  );
};

const TryToEditPhoto = () => {
  const [result, setResult] = useState("");

  const onSubmit = async event => {
    event.preventDefault();
    const id = event.target.querySelector("input[name='photoId']").value;

    //console.log("Submit", id);

    try {
      setResult("...Loading");
      await getFirestoreDb().collection(collectionName).doc(id).update({
        date: new Date(),
      });

      setResult(`Success edited | ${id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={onSubmit}>
        <input
          style={{ height: "34px" }}
          type="submit"
          value="Try to edit photo"
        />
        <input
          style={{ marginLeft: "10px" }}
          name="photoId"
          placeholder="Photo id"
        />
      </form>

      {result && (
        <p
          style={{
            display: "block",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          {result}
        </p>
      )}

      <ul>
        <li>
          <p>User can edit only his own photo.</p>
        </li>
      </ul>
    </div>
  );
};

const PhotoTab = () => {
  return (
    <div style={{ padding: "30px" }}>
      <GetAllPhotos />

      <TryToAddPhoto />

      <TryToEditPhoto />

      <TryToDeletePhoto />
    </div>
  );
};

export default PhotoTab;
