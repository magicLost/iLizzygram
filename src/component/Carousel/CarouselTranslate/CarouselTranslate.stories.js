import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import CarouselTranslate from "./CarouselTranslate";
import { useCarouselTranslate } from "../../../hooks/carousel/carousel";

export default {
  component: CarouselTranslate,
  title: "Carousel/CarouselTranslate",
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
          width: "700px",
          height: "300px",
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

const getCarouselItems = (itemClass, activeIndex) => {
  console.log("GET CarouselTranslate items");

  return [0, 1, 2, 3, 4].map((item, index) => {
    return (
      <li key={itemClass + index} className={itemClass}>
        <div>
          <h3>{`Item number ${index + 1}`}</h3>
        </div>
      </li>
    );
  });
};

export const Default = () => {
  const items = [0, 1, 2, 3, 4];

  const {
    translateX,
    isTranslated,
    activeIndex,
    controller,
  } = useCarouselTranslate(items.length);

  return (
    <CarouselTranslate
      items={items}
      getItems={getCarouselItems}
      activeIndex={activeIndex}
      translateX={translateX}
      isTranslated={isTranslated}
      controller={controller}
    />
  );
};
