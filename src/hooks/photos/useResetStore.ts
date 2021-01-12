import React, { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { cache } from "../../apolloClient/cache";
import keys from "lodash.keys";

const updates: Map<string, any> = new Map();

const iResetStore = async (apolloClient: any) => {
  const res = await apolloClient.resetStore();
  apolloClient.cache.restore(cache);

  //console.log("RESET STORE ", updates, res);

  const updatedQueries = [];

  for (let queryResult of res) {
    const props: string[] = keys(queryResult.data);
    if (props.length > 1 || props.length < 1) {
      throw new Error(`Bad data - ${props.length}`);
    }

    //console.log("[RESET STORE", props[0]);
    if (updates.has(props[0]) && !updatedQueries.includes(props[0])) {
      //We call our update query function that we set to useResetStore
      updates.get(props[0])(queryResult.data);
      //console.log("[RESET STORE UPDATE", props[0]);
    }

    updatedQueries.push(props[0]);
  }
};

//var update - [name, updateQueryFunc]
export const useResetStore = (update?: any[]) => {
  const client = useApolloClient();

  useEffect(() => {
    if (update) {
      const [name, updateQueryFunc] = update;
      updates.set(name, updateQueryFunc);

      return () => updates.delete(name);
    }
  });

  const resetStore = () => {
    iResetStore(client);
  };

  return {
    resetStore,
  };
};
