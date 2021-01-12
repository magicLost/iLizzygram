import React from "react";
//import { action } from "@storybook/addon-actions";
//import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NavUserBtnWithMenu from ".";
import FaceIcon from "@material-ui/icons/Face";
import LockIcon from "@material-ui/icons/Lock";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    authButton: {
      marginLeft: "auto",
      // padding: "2px",
    },
    userPhoto: {
      borderRadius: "50%",
    },
    appBarBGColor: {
      backgroundColor: "#55c57a",
    },
    label: {
      textTransform: "capitalize",
    },
  })
);

export default {
  component: NavUserBtnWithMenu,
  title: "Components/NavUserBtnWithMenu",
  decorators: [],
  // Our exports that end in "Data" are not stories.
  //excludeStories: /.*Data$/,
};

export const Default = () => {
  const classes = useStyles();
  return (
    <Box width={"100px"} margin={"auto"}>
      <NavUserBtnWithMenu
        userButton={
          <Button
            classes={{
              label: classes.label,
            }}
            className={classes.authButton}
            startIcon={<FaceIcon />}
          >
            {"КирНат"}
          </Button>
        }
      />
    </Box>
  );
};
