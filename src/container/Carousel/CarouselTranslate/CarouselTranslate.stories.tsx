import React, { useMemo } from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import CarouselTranslate from ".";
import { useCarouselTranslate } from "./hook";

export default {
  component: CarouselTranslate,
  title: "Carousel/CarouselTranslate",
  decorators: [
    story => (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
          width: "700px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const getCarouselItems = () => {
  console.log("GET CarouselTranslate items");

  return [0, 1, 2, 3, 4].map((item, index) => {
    return (
      <div
        key={"hello" + item + index}
        style={{
          width: "500px",
          height: "400px",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <h3>{`Item number ${index + 1}`}</h3>
      </div>
    );
  });
};

const items = [0, 1, 2, 3, 4];

export const Default = () => {
  const { controller } = useCarouselTranslate(items.length);

  const itemsElements = useMemo(getCarouselItems, [items]);

  return (
    <CarouselTranslate controller={controller}>
      {itemsElements}
    </CarouselTranslate>
  );
};
