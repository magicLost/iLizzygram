import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

export interface IAgeSliderProps {
  value: number[];
  handleChange: (event: any, newValue: number | number[]) => void;
  max: number;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
});

const AgeSlider = ({ value, handleChange, max }: IAgeSliderProps) => {
  const classes = useStyles();
  /* const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  }; */

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Возраст Лизы на фото:
      </Typography>
      <Slider
        name="ages"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        step={1}
        marks
        min={0}
        max={max}
      />
    </div>
  );
};

export default AgeSlider;
