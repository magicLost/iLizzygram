import React, { useRef, useEffect, useState } from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import ImageSharp from ".";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  // style rule

  image: (props) => ({
    /* position: "relative",
    top: 0,
    left: 0, */
    width: props.isAspectRatio ? "100vw" : "150vh",
    height: props.isAspectRatio ? `${Math.round((100 / 15) * 10)}vw` : "100vh",
  }),
  background: (props) => ({
    display: "block",
    background: `url("${props.base64}") no-repeat`,
    backgroundSize: "cover",
  }),
});

export default {
  component: ImageSharp,
  title: "Image/ImageSharp",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <ImageSharp
      base64="data:image/jpg;base64, /9j/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAfADIDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAABwADBAYIBf/EADAQAAEDAwEGBAQHAAAAAAAAAAECAwQABRESBgcTITFhFSJBkhYjMlFUVWNxc4Hw/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ADgiVHPISGieyxTweaxniI9wrG6bzc0KymfIB/kNSU7R3kAJFxk++g18ZLCfqebH7rFNG5QUkgzGAR+oKybMuN4bU2V3J9fETnyuU/boF1uTL8kS3Q0zzWVOHJ7daAvb2VIubdsQw80/H4vzEoUCa7+xtystmsDcZVwYbwc6Cr6aBSZE5+Nwop4aPUrWSTUJ6wTSOIX0ebmcrNBqL4osf5nH91KsqeCyfxSPcaVAXIu5G3k5dmuKHaum3uUsQSAp50n70QGHRp9alJWDQDx/czZHUp0vOoKRyOaq+1Oy6djba4zAcXIK/O7qHRP+FG5SjpOnr6ZoeyR4jMvcC4p1SQySFDppwaAEyHsJC05TkZHeuxs8xa7glxm4S1MunGjJ5darM90h4sgYS0opH9VGW6SUkciKC+/CUE8xOHPvSqnpnPhIHEV0+9Kg/9k="
      src="/images/sad-girl-1200.jpg"
      srcSet="/images/sad-girl-1200.jpg 1200w"
      sizes="(max-aspect-ratio: 16/10) 100vw, 160vh"
      isActive={true}
      alt="alt"
    />
  );
};

const base64 =
  "data:image/jpg;base64, /9j/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAfADIDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAABwADBAYIBf/EADAQAAEDAwEGBAQHAAAAAAAAAAECAwQABRESBgcTITFhFSJBkhYjMlFUVWNxc4Hw/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ADgiVHPISGieyxTweaxniI9wrG6bzc0KymfIB/kNSU7R3kAJFxk++g18ZLCfqebH7rFNG5QUkgzGAR+oKybMuN4bU2V3J9fETnyuU/boF1uTL8kS3Q0zzWVOHJ7daAvb2VIubdsQw80/H4vzEoUCa7+xtystmsDcZVwYbwc6Cr6aBSZE5+Nwop4aPUrWSTUJ6wTSOIX0ebmcrNBqL4osf5nH91KsqeCyfxSPcaVAXIu5G3k5dmuKHaum3uUsQSAp50n70QGHRp9alJWDQDx/czZHUp0vOoKRyOaq+1Oy6djba4zAcXIK/O7qHRP+FG5SjpOnr6ZoeyR4jMvcC4p1SQySFDppwaAEyHsJC05TkZHeuxs8xa7glxm4S1MunGjJ5darM90h4sgYS0opH9VGW6SUkciKC+/CUE8xOHPvSqnpnPhIHEV0+9Kg/9k=";

export const TestBase64 = () => {
  const [isBackground, setIsBackground] = useState(true);
  const isAspectRatio = useMediaQuery("(max-aspect-ratio: 15/10)");
  const classes = useStyles({ base64, isAspectRatio });

  const onLoad = () => {
    setIsBackground(false);
  };

  const imageClasses = isBackground
    ? [classes.image, classes.background].join(" ")
    : classes.image;

  return (
    <Box display="flex" justifyContent="center">
      <img
        onLoad={onLoad}
        className={imageClasses}
        alt="hello"
        src="/images/sad-girl-1200.jpg"
      />
    </Box>
  );
};
