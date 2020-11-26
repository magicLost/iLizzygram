import React, { useState } from "react";
import { db } from "../../container/ReduxWrapper";

const collectionName = "tags";

const GetAllTags = () => {
  const [result, setResult] = useState("");
  const onClick = async () => {
    try {
      setResult("...Loading");
      const res = await db.collection(collectionName).get();
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
      <button onClick={onClick}>Get tags</button>
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
          <p>We show tags only to auth users</p>
        </li>
      </ul>
    </div>
  );
};

const GetTagById = () => {
  const [result, setResult] = useState("");

  const onSubmit = async event => {
    event.preventDefault();
    const id = event.target.querySelector("input[name='tagId']").value;

    //console.log("Submit", id);

    try {
      setResult("...Loading");
      const res = await db.collection(collectionName).doc(id).get();

      setResult(`Success | ${res.id}`);
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
          value="Try to get tag by id"
        />
        <input
          style={{ marginLeft: "10px" }}
          name="tagId"
          placeholder="Tag id"
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
          <p>We can not get one tag.</p>
        </li>
      </ul>
    </div>
  );
};

const TryToAddTag = () => {
  const [result, setResult] = useState("");
  const onClick = async () => {
    try {
      setResult("...Loading");
      const res = await db.collection(collectionName).add({
        name: "hello",
        title: "welcome",
      });

      setResult(`Success | ${res.id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <button onClick={onClick}>Try to add tag</button>
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
          <p>No one can add tag.</p>
        </li>
      </ul>
    </div>
  );
};

const TryToDeleteTag = () => {
  const [result, setResult] = useState("");

  const onSubmit = async event => {
    event.preventDefault();
    const id = event.target.querySelector("input[name='tagId']").value;

    //console.log("Submit", id);

    try {
      setResult("...Loading");
      await db.collection(collectionName).doc(id).delete();

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
          value="Try to delete tag"
        />
        <input
          style={{ marginLeft: "10px" }}
          name="tagId"
          placeholder="tag id"
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
          <p>No one can delete tag.</p>
        </li>
      </ul>
    </div>
  );
};

const TryToEditTag = () => {
  const [result, setResult] = useState("");

  const onSubmit = async event => {
    event.preventDefault();
    const id = event.target.querySelector("input[name='tagId']").value;

    //console.log("Submit", id);

    try {
      setResult("...Loading");
      await db.collection(collectionName).doc(id).update({
        title: "Blue valentine",
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
          value="Try to edit tag"
        />
        <input
          style={{ marginLeft: "10px" }}
          name="tagId"
          placeholder="Tag id"
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
          <p>No one can edit tag.</p>
        </li>
      </ul>
    </div>
  );
};

const PhotoTab = () => {
  return (
    <div style={{ padding: "30px" }}>
      <GetAllTags />

      <GetTagById />

      <TryToAddTag />

      <TryToEditTag />

      <TryToDeleteTag />
    </div>
  );
};

export default PhotoTab;
