import { ITagsAction, TTagsData } from "./../types";
//import { ICheckboxItemData } from "./../../component/FormElements/TagsCheckbox";
import { getFirestoreDb } from "./../../firebase/initFirestore";
import { tagsCollectionName } from "../../config";

export const tagsRequestAC = (): ITagsAction => {
  return {
    type: "TAGS_REQUEST",
  };
};

export const tagsRequestSuccessAC = (tags: TTagsData): ITagsAction => {
  return {
    type: "TAGS_REQUEST_SUCCESS",
    tags,
  };
};

export const tagsRequestErrorAC = (): ITagsAction => {
  return {
    type: "TAGS_REQUEST_ERROR",
  };
};

export const fetchTagsAC = () => {
  return async dispatch => {
    try {
      dispatch(tagsRequestAC());
      //TODO request to tags to firebase
      //console.log("SUCCESS", data.docs.length);

      const tags: TTagsData = new Map();

      const snap = await getFirestoreDb().collection(tagsCollectionName).get();

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
    } catch (err) {
      dispatch(tagsRequestErrorAC());
    }
  };
};
