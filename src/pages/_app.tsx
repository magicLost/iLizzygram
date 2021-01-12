import "../../styles/globals.css";
import Head from "next/head";
import ErrorBoundary from "../component/ErrorBoundary";
import { useEffect } from "react";
import Layout from "./../container/partial/Layout";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
/* import modalReducer from "./../store/reducer/modal";
import alertReducer from "./../store/reducer/alert";
import tagsReducer from "./../store/reducer/tags";
import photoReducer from "./../photos/store/reducer/photos";
import searchReducer from "./../photos/store/reducer/photos";
import authReducer from "./../auth/store/reducer"; */
//import { modalReducer } from "./../store";

import { initApp } from "./../firebase/initApp";
import { modalReducer, alertReducer, tagsReducer } from "./../store";
import { photoReducer, searchReducer } from "./../photos";
import { authReducer } from "./../auth";
console.log("INITIALIZE");

initApp();

//CONFIG REDUX
const reducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  tags: tagsReducer,
  search: searchReducer,
  photos: photoReducer,
});

const composeEnhancers = compose;

const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

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
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

/*  <Provider store={store}>
            <Layout> 
          <Component {...pageProps} />
           </Layout> 
        </Provider> */
