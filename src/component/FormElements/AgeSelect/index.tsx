import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { lizzyYearsOld } from "../../../config";

export interface IAgeSelectProps {
  value: number;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      //margin: theme.spacing(1),
      minWidth: 200,
    },
  })
);

const titles = new Map([
  [0, "Меньше года"],
  [1, "1 год"],
  [2, "2 года"],
  [3, "3 года"],
  [4, "4 года"],
  [5, "5 лет"],
  [6, "6 лет"],
  [7, "7 лет"],
  [8, "8 лет"],
  [9, "9 лет"],
  [10, "10 лет"],
]);

const getMenuItems = () => {
  const menuItems = [];
  menuItems.push(
    <MenuItem key={`MenuItem_-1`} value={-1}>
      <em>Любой</em>
    </MenuItem>
  );
  let cnt = 0;
  titles.forEach((title, age) => {
    if (cnt <= lizzyYearsOld) {
      menuItems.push(
        <MenuItem key={`MenuItem_${age}`} value={age}>
          {title}
        </MenuItem>
      );
      cnt++;
    } else {
      return;
    }
  });
};

export default function AgeSelect({ value, onChange }: IAgeSelectProps) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Возраст Лизы на фото:
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          /* open={open} */
          /*  onClose={handleClose}
          onOpen={handleOpen} */
          value={value}
          onChange={onChange}
        >
          <MenuItem value={-1}>
            <em>Любой</em>
          </MenuItem>
          <MenuItem value={0}>Меньше года</MenuItem>
          <MenuItem value={1}>1 год</MenuItem>
          <MenuItem value={2}>2 года</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
