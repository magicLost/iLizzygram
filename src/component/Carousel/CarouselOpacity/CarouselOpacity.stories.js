import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import CarouselOpacity from "./CarouselOpacity";
import { useCarouselOpacity } from "../../../hooks/carousel/carousel";

export default {
  component: CarouselOpacity,
  title: "Carousel/CarouselOpacity",
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

const photos = [
  {
    src: "/images/freestocks-9U.jpg-1200.jpg",
  },
  {
    src: "/images/sad-girl-1900.jpg-1200.jpg",
  },
  {
    src: "/images/girl_600.jpeg-1200.jpg",
  },
];

const getCarouselItems = (photos) => {
  console.log("GET CarouselTranslate items");

  return photos.map((item, index) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <img style={{ height: "auto", width: "100%" }} src={item.src} />
      </div>
    );
  });
};

export const Default = () => {
  const { opacity, isTranslated, activeIndex, controller } = useCarouselOpacity(
    photos.length,
    1
  );

  const carouselItems = getCarouselItems(photos);

  return (
    <CarouselOpacity
      activeIndex={activeIndex}
      opacity={opacity}
      isTranslated={isTranslated}
      controller={controller}
      onFetchMore={() => console.log("Fetch more...")}
    >
      {carouselItems}
    </CarouselOpacity>
  );
};
