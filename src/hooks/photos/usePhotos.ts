import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { IPhoto } from "../../types";
//import { useEffect } from "react";
import { SEARCH } from "../../apolloClient/queries";
//import { cache } from "../../apolloClient/cache";
import { showAlert } from "../../apolloClient/cache.controller";

//import query from "./photos.graphql";

export interface PhotoData {
  photos: {
    edges: IPhoto[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}

export const PHOTO_FIELDS_FRAGMENT = gql`
  fragment PhotoFields on Photo {
    _id
    base64
    files
    srcSet
    iconSrc
    src
    description
    aspectRatio
    date
    _timestamp
    tags {
      _id
      name
      title
    }
  }
`;

export const PHOTOS = gql`
  query getAllPhotos(
    $limit: Int
    $tagsIds: [String!]
    $isSortDesc: Boolean!
    $cursor: Float
  ) {
    photos(
      limit: $limit
      tagsIds: $tagsIds
      isSortDesc: $isSortDesc
      cursor: $cursor
    ) {
      edges {
        ...PhotoFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${PHOTO_FIELDS_FRAGMENT}
`;

export const usePhotos = (
  //isRerenderOnClearStore: boolean = false,
  limit: number = 5,
  isSortDesc: boolean = true,
  tagsIds?: string[]
) => {
  const {
    data,
    fetchMore,
    loading,
    error,
    refetch,
    updateQuery,
    client,
  } = useQuery<PhotoData>(PHOTOS, {
    notifyOnNetworkStatusChange: true,
    //fetchPolicy: "cache-and-network",
    variables: {
      limit,
      isSortDesc,
      tagsIds,
      cursor: undefined,
    },
    errorPolicy: "all",
    onError: () => {
      showAlert(
        "error",
        "К сожалению, произошла ошибочка. Пожалуйста попробуйте позже..."
      );
    },
  });

  const refetchQuery = async () => {
    const res = await refetch({
      limit,
      isSortDesc,
      tagsIds,
      //cursor,
    });

    console.log("REFETCH QUERY ", res.data);

    updateQuery((previousQueryResult, opt) => {
      //console.log("UPDATE QUERY", opt, previousQueryResult);
      return res.data;
    });
  };

  /*  useEffect(() => {
    let unregister = undefined;
    if (isRerenderOnClearStore) {
      unregister = client.onClearStore(async () => {
        //setValue((prevValue) => prevValue + 1);
        const res = await refetch({
          limit,
          isSortDesc: true,
          //tagsIds,
          //cursor,
        });
        updateQuery((previousQueryResult, opt) => {
          //console.log("UPDATE QUERY", opt, previousQueryResult);
          return res.data;
        });
        //console.log("ON CLEAR STORE", res);
        return res;
      });
    }

    return () => {
      if (unregister) {
        console.log("unregister");
        unregister();
      }
    };
  }, []); */

  //console.log("USE PHOTOS ", data, loading);

  const loadMore = async () => {
    try {
      await fetchMore({
        variables: {
          /* limit,
          isSortDesc,
          tagsIds, */
          cursor: data.photos.pageInfo.endCursor,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return new Error("No fetch more result");

          console.log("PREVIOUS RESULT", previousResult, fetchMoreResult);

          const newEdges = fetchMoreResult.photos.edges;
          const pageInfo = fetchMoreResult.photos.pageInfo;

          return newEdges.length
            ? {
                // Put the new comments at the end of the list and update `pageInfo`
                // so we have the new `endCursor` and `hasNextPage` values
                photos: {
                  __typename: previousResult.photos.__typename,
                  edges: [...previousResult.photos.edges, ...newEdges],
                  pageInfo,
                },
              }
            : previousResult;
        },
      });
    } catch (err) {
      showAlert(
        "error",
        "К сожалению, произошла ошибочка. Пожалуйста, попробуйте позже..."
      );
    }
  };

  return {
    data,
    loadMore,
    loading,
    error,
    refetch,
    refetchQuery,
    updateQuery,
  };
};

export const usePhotosWithSearch = () => {
  const {
    data: {
      search: { isSortDesc, tagsIds, limit },
    },
    client,
  } = useQuery(SEARCH);
  //console.log("AFTER");
  const {
    data,
    loadMore,
    loading,
    error,
    refetchQuery,
    updateQuery,
  } = usePhotos(limit, isSortDesc, tagsIds);

  /*  const resetStore = async () => {
    //const cacheBefore = { ...client.cache };
    //console.log("BEFORE RESET STORE ", cacheBefore);
    const res = await client.resetStore();
    client.cache.restore(cache);
    //const res = await client.reFetchObservableQueries();

    console.log("RESET STORE ", res);
    if (!res[3].data && !res[3].data.photos)
      throw new Error("We use wrong data");

    //refetchQuery();
    updateQuery((previousQueryResult, opt) => {
      //console.log("UPDATE QUERY", opt, previousQueryResult);
      return res[3].data;
    });
  }; */

  const ourUpdateQuery = (data: PhotoData) => {
    updateQuery((previousQueryResult, opt) => {
      //console.log("UPDATE QUERY", opt, previousQueryResult);
      return data;
    });
  };

  const update = ["photos", ourUpdateQuery];

  return {
    data,
    loadMore,
    loading,
    error,
    //resetStore,
    //refetchQuery,
    //updateQuery,
    update,
    isSortDesc,
    tagsIds,
    limit,
  };
};
