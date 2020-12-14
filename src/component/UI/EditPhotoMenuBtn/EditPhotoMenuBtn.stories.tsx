import React from "react";
//import { action } from "@storybook/addon-actions";
//import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import EditPhotoMenuBtn from ".";
//import { createStyles, makeStyles } from "@material-ui/core/styles";

/* const useStyles = makeStyles(theme =>
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
); */

export default {
  component: EditPhotoMenuBtn,
  title: "Components/EditPhotoMenuBtn",
  decorators: [],
  // Our exports that end in "Data" are not stories.
  //excludeStories: /.*Data$/,
};

const Template = args => <EditPhotoMenuBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};
