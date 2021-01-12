import TestReactiveVar from "./.";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../../apolloClient";

export default {
  title: "Test/TestReactiveVar",
  component: TestReactiveVar,
};

export const Default = () => {
  const apolloClient = useApollo();

  return (
    <ApolloProvider client={apolloClient}>
      <TestReactiveVar />
    </ApolloProvider>
  );
};
