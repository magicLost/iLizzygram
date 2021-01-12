import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IGlobalState } from "./../../store/types";
import { showPhotoSliderAC, showEditFormAC, showAlertAC } from "./../../store";
import { Button } from "@material-ui/core";
import React, { useState } from "react";

export const ElementWithUseSelector = () => {
  const dispatch = useDispatch();

  const { isShowSlider, isShowEditForm } = useSelector<IGlobalState, any>(
    state => ({
      isShowSlider: state.modal.openSlider,
      isShowEditForm: state.modal.openEditForm,
    }),
    shallowEqual
  );

  console.log("[RENDER ElementWithUseSelector]");

  return (
    <div>
      <p>isShowSlider - {isShowSlider ? "true" : "false"}</p>
      <p>isShowEditForm - {isShowEditForm ? "true" : "false"}</p>
    </div>
  );
};

const _refMain = <ElementWithUseSelector />;
const IElementWithUseSelector = () => _refMain;

export const Main = () => {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const changeAlertState = () => dispatch(showAlertAC("Hello", "success"));

  const showSlider = () => dispatch(showPhotoSliderAC({} as any, 23));

  const showEditForm = () => dispatch(showEditFormAC({} as any));

  const onClick = () => setCount(count + 1);

  console.log("[RENDER MAIN]");

  return (
    <>
      <div>
        <Button onClick={changeAlertState}>Change alert state</Button>
        <Button onClick={showSlider}>Show slider</Button>
        <Button onClick={showEditForm}>Show edit form</Button>
        <Button onClick={onClick}>Enternal state</Button>
      </div>
      <p>Count - {count}</p>
      <IElementWithUseSelector />
    </>
  );
};
