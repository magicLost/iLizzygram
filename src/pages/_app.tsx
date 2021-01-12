import React, { useEffect } from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apolloClient";
import ErrorBoundary from "../component/ErrorBoundary/ErrorBoundary";
import Layout from "../container/partial/Layout/Layout";
import { checkSavedUser } from "../hooks/auth/auth.helper";

interface IAppProps {
  Component: React.FunctionComponent;
  pageProps: any;
}

export default function App({ Component, pageProps }: IAppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    //CHECKED SAVED USER
    checkSavedUser();
  }, []);

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ErrorBoundary>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </ApolloProvider>
    </>
  );
}
