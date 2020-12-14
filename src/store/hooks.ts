import {
  tagsRequestAC,
  tagsRequestSuccessAC,
  tagsRequestErrorAC,
} from "./action/tags";
import { useSelector, useDispatch } from "react-redux";
import { IAlertState, IGlobalState, ITagsState, TTagsData } from "./types";
import { useEffect } from "react";
//import { ICheckboxItemData } from "./../../component/FormElements/TagsCheckbox";
import { db } from "./../container/ReduxWrapper";
import { tagsCollectionName } from "../config";
import { showAlertAC } from "./action/alert";
import { Color } from "@material-ui/lab/Alert";

let isRequest = false;

/* TAGS */
export const useTags = () => {
  const dispatch = useDispatch();

  const tagsState = useSelector<IGlobalState, ITagsState>(state => state.tags);

  useEffect(() => {
    if (!tagsState.tags && !tagsState.loading && !tagsState.error) {
      console.log("[USE TAGS] USE EFFECT | FETCH TAGS");
      fetchTags(dispatch);
    }
  }, [tagsState.tags]);

  return {
    tagsState,
    fetchTags,
  };
};

export const fetchTags = async dispatch => {
  try {
    dispatch(tagsRequestAC());

    isRequest = true;
    //TODO request to tags to firebase
    //console.log("SUCCESS", data.docs.length);

    const tags: TTagsData = new Map();

    const snap = await db.collection(tagsCollectionName).get();

    snap.forEach(tag => {
      tags.set(tag.id, tag.data() as any);
    });

    /* const tags = new Map([
          ["Hrj1grEKx6oM9Z1ZGP0G", { title: "зюганов", name: "zuganov" }],
          ["L45RiBaK18AEoyVekFQT", { name: "pets", title: "с животными" }],
          ["Pa8GvtwrT1tMDgNLwy4S", { title: "на улице", name: "street" }],
          ["Ql2r2DFzzjZnzP2adh9Z", { name: "smile", title: "улыбка" }],
          ["YBa0wyeWwEB6takyExmF", { title: "задумчиво", name: "thoughtfully" }],
          ["YxX09wTx6kWOfZQ0ORFs", { title: "дома", name: "home" }],
          ["cdbI7sOCFVFv337chtBE", { title: "на природе", name: "nature" }],
        ]); */

    dispatch(tagsRequestSuccessAC(tags));

    isRequest = false;
  } catch (err) {
    dispatch(tagsRequestErrorAC());

    isRequest = false;
  }
};
