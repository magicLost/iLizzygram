import { PHOTOS, usePhotosWithSearch } from "./usePhotos";
import { useResetStore } from "./useResetStore";

import { cache, searchVar } from "../../apolloClient/cache";
import { mockQueriesData } from "../../component/WallOfPhotos/WallOfPhotos.stories";
import { MockedProvider } from "@apollo/client/testing";
import { useApolloClient, ApolloProvider, useMutation } from "@apollo/client";
import { useApollo } from "../../apolloClient";
import { LOGOUT } from "../auth/auth.queries";

const MutationAndRefetch = () => {
  const { limit, isSortDesc, tagsIds } = searchVar();
  const [logout, { loading }] = useMutation(LOGOUT, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      {
        query: PHOTOS,
        variables: {
          limit,
          isSortDesc,
          tagsIds,
          cursor: undefined,
        },
      },
    ],
  });
  return (
    <div>
      <button onClick={() => logout()}>Logout and refetch photos.</button>
    </div>
  );
};

const Element = () => {
  const {
    limit,
    data,
    loadMore,
    loading,
    error,
    update,
  } = usePhotosWithSearch();

  const client = useApolloClient();

  const { resetStore } = useResetStore(update);

  const getPhotos = (data) => {
    if (!data) return null;
    return data.photos.edges.map((photo, index) => {
      return <li key={`${photo._id}_${index}`}>{photo._id}</li>;
    });
  };

  const photos = getPhotos(data);

  console.log("[RENDER TEST ELEMENT]", data);

  //TODO: TRY REFETCH_QUERIES AFTER USE_MUTATION

  return (
    <>
      <p>Element</p>
      <button onClick={() => loadMore()}>Load more photos.</button>

      <span> | </span>

      <button
        onClick={async () => {
          searchVar({
            isSearch: false,
            isSortDesc: true,
            tagsIds: [],
            limit: 6,
          });
        }}
      >
        Change search state.
      </button>

      <p>{`Page info - ${data ? JSON.stringify(data.photos.pageInfo) : ""}`}</p>
      <ul>{photos}</ul>

      <p>{`Search state - ${JSON.stringify(searchVar())}`}</p>
    </>
  );
};

const ResetStore = () => {
  const { resetStore } = useResetStore();
  return <button onClick={() => resetStore()}>Real reset store.</button>;
};

export default {
  title: "Test/Reset store",
  component: Element,
};

/* export const onMockServer = () => {
  console.log("CACHE!!!!!!!!!!!!!!1", cache);
  const mock = [...mockQueriesData];
  return (
    <MockedProvider mocks={mock} cache={cache} addTypename={true}>
      <Element />
    </MockedProvider>
  );
}; */

export const onRealServer = () => {
  const apolloClient = useApollo();

  //console.log("CACHE!!!!!!!!!!!!!!1", cache);
  //const mock = [...mockQueriesData];
  return (
    <ApolloProvider client={apolloClient}>
      <Element />
      <ResetStore />
      <MutationAndRefetch />
    </ApolloProvider>
  );
};
