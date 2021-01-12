import React, { useState } from "react";
//import classes from './TestScroll.module.scss';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface TestScrollProps {}

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  image: {
    width: "500px",
    height: "400px",
    backgroundColor: "cyan",
  },
  info: {
    position: "absolute",
    top: "20px",
    left: "30px",
    backgroundColor: "white",
    padding: "15px",
    border: "2px solid cyan",
    borderRadius: "5px",
  },
});

const TestScroll = ({}: TestScrollProps) => {
  const classes = useStyles();
  const [touch, setTouch] = useState({
    eventType: "",
    targetTouches: 0,
    changedTouches: 0,
  });

  const onTouchStart = (event: any) => {
    console.log("TOUCH START targetTouches", event.targetTouches);
    console.log("TOUCH START changedTouches", event.changedTouches);
    setTouch({
      eventType: "TOUCH START",
      targetTouches: event.targetTouches.length,
      changedTouches: event.changedTouches.length,
    });
  };
  const onTouchMove = (event: any) => {
    console.log("TOUCH MOVE targetTouches", event.targetTouches);
    console.log("TOUCH MOVE changedTouches", event.changedTouches);
    setTouch({
      eventType: "TOUCH MOVE",
      targetTouches: event.targetTouches.length,
      changedTouches: event.changedTouches.length,
    });
  };
  const onTouchEnd = (event: any) => {
    console.log("TOUCH END targetTouches", event.targetTouches);
    console.log("TOUCH END changedTouches", event.changedTouches);
    setTouch({
      eventType: "TOUCH END",
      targetTouches: event.targetTouches.length,
      changedTouches: event.changedTouches.length,
    });
  };
  return (
    <div
      className={classes.root}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* <img
        className={classes.image}
        src="/images/sad-girl-1200.jpg"
        alt="hello"
      /> */}
      <div className={classes.image}></div>
      <div className={classes.info}>
        <p>Event type: {touch.eventType}</p>
        <p>Target touches: {touch.targetTouches}</p>
        <p>Changed touches: {touch.changedTouches}</p>
      </div>
    </div>
  );
};

export default TestScroll;
