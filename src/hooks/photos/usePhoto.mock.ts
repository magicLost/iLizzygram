import { PHOTOS } from "./usePhotos";

export const photos1Data = {
  edges: [
    {
      _id: "1234wec",
      _timestamp: 123,
      files: ["hello.jpb"],
      base64: "",
      aspectRatio: 1.5,
      src: "/images/2843935651.jpg-400.jpg",
      iconSrc: "/images/2843935651.jpg-400.jpg",
      srcSet: "/images/2843935651.jpg-1200.jpg",
      date: new Date(2018, 11, 17),
      description: "street1.jpg",
      tags: [],
      __typename: "Photo",
    },
    {
      _id: "5634wec",
      _timestamp: 124,
      files: ["hell.jpj"],
      base64: "",
      aspectRatio: 0.78,
      iconSrc: "/images/eva-green-venus.jpg-400.jpg",
      src: "/images/eva-green-venus.jpg-400.jpg",
      srcSet: "/images/eva-green-venus.jpg-1200.jpg",
      date: new Date(2018, 10, 23),
      description: "street2.jpg",
      tags: [],
      __typename: "Photo",
    },

    {
      _id: "1994wec",
      _timestamp: 1783,
      files: ["h.png"],
      base64: "",
      aspectRatio: 1.5,
      iconSrc: "/images/freestocks-8a9.jpg-400.jpg",
      srcSet: "/images/freestocks-8a9.jpg-1200.jpg",
      src: "/images/freestocks-8a9.jpg-400.jpg",
      date: new Date(2019, 9, 23),
      description: "street3.jpg",
      tags: [],
      __typename: "Photo",
    },
    {
      _id: "1068oec",
      _timestamp: 623,
      files: ["ll.jpb"],
      base64: "",
      aspectRatio: 1.5,
      iconSrc: "/images/freestocks-9U.jpg-400.jpg",
      srcSet: "/images/freestocks-9U.jpg-1200.jpg",
      src: "/images/freestocks-9U.jpg-1200.jpg",
      date: new Date(2020, 10, 21),
      description: "street4.jpg",
      tags: [],
      __typename: "Photo",
    },
  ],
  pageInfo: {
    endCursor: 1234,
    hasNextPage: true,
  },
};

export const photos2Data = {
  edges: [
    {
      _id: "1068olj",
      _timestamp: 1239,
      files: ["hello1.jpeg"],
      base64: "",
      aspectRatio: 1,
      iconSrc: "/images/girl_600.jpeg-400.jpg",
      srcSet: "/images/girl_600.jpeg-1200.jpg",
      src: "/images/girl_600.jpeg-1200.jpg",
      date: new Date(2018, 1, 23),
      description: "wall1.jpg",
      tags: [],
      __typename: "Photo",
    },
    {
      _id: "1068dfg",
      _timestamp: 12356,
      files: ["ty.jpb"],
      base64: "",
      aspectRatio: 1.6,
      iconSrc: "/images/Holly.jpg-400.jpg",
      srcSet: "/images/Holly.jpg-1200.jpg",
      src: "/images/Holly.jpg-1200.jpg",
      date: new Date(2018, 10, 31),
      description: "wall2.jpg",
      tags: [],
      __typename: "Photo",
    },

    {
      _id: "1068zec",
      _timestamp: 123546,
      files: ["e.jpb"],
      base64: "",
      aspectRatio: 1.78,
      iconSrc: "/images/maxresdefault.jpg-400.jpg",
      srcSet: "/images/maxresdefault.jpg-1200.jpg",
      src: "/images/maxresdefault.jpg-1200.jpg",
      date: new Date(2018, 11, 3),
      description: "wall3.jpg",
      tags: [],
      __typename: "Photo",
    },
    {
      _id: "1068nbx",
      _timestamp: 12367,
      files: ["hell666.jpb"],
      base64: "",
      aspectRatio: 0.81,
      iconSrc: "/images/odri.webp-400.jpg",
      srcSet: "/images/odri.webp-1200.jpg",
      src: "/images/odri.webp-1200.jpg",
      date: new Date(2018, 2, 2),
      description: "wall4.jpg",
      tags: [],
      __typename: "Photo",
    },
  ],
  pageInfo: {
    endCursor: 1234,
    hasNextPage: false,
  },
};

export const mockQueriesData = [
  {
    request: {
      query: PHOTOS,
      variables: {
        limit: 5,
        isSortDesc: true,
        tagsIds: [],
        cursor: undefined,
      },
    },
    result: {
      data: {
        photos: photos1Data,
      },
    },
  },
  {
    request: {
      query: PHOTOS,
      variables: {
        limit: 5,
        isSortDesc: true,
        tagsIds: [],
        cursor: 1234,
      },
    },
    result: {
      data: {
        photos: photos2Data,
      },
    },
  },
  {
    request: {
      query: PHOTOS,
      variables: {
        limit: 5,
        isSortDesc: true,
        tagsIds: [],
        cursor: undefined,
      },
    },
    result: {
      data: {
        photos: photos1Data,
      },
    },
  },
];
