import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface ISimpleTabsProps {
  children: React.ReactElement[];
  titles: string[];
}

const SimpleTabs = ({ children, titles }: ISimpleTabsProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const TitleTabs = titles.map((title, index) => {
    return <Tab key={title + index} label={title} {...a11yProps(index)} />;
  });

  const TabPanelElements = React.Children.map(children, (child, i) => {
    return (
      <TabPanel key={`TabPanel_${titles[i]}_${i}`} value={value} index={i}>
        {React.cloneElement(child, { color: "red" })}
      </TabPanel>
    );
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="simple tabs example"
        >
          {TitleTabs}
        </Tabs>
      </AppBar>
      {TabPanelElements}
    </div>
  );
};

export default SimpleTabs;
