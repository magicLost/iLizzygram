import React, { useState } from "react";
//import { connect } from "react-redux";
/* import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import Layout from "../container/partial/Layout";
import IconButton from "@material-ui/core/IconButton";
import AdbIcon from "@material-ui/icons/Adb";
import Button from "@material-ui/core/Button";
import MaterialLink from "@material-ui/core/Link"; */
//import { Link } from "gatsby";
//import Backdrop from "@material-ui/core/Backdrop";
import ErrorBoundary from "../component/ErrorBoundary";
import SEO from "../component/SEO";
//import SEO from "../component/SEO";
//import Logo from "../component/Logo";
import Photos from "../photos/container/Photos";
//import { IAuthUser } from "./../types";

/* const LogoLoadable = loadable(
  //import(/* webpackPrefetch: true / '../component/Logo')
  () =>
    pMinDelay(
      import("../component/Logo").catch(err =>
        console.log("LOADABLE ERROR", err)
      ),
      300
    ),
  {
    fallback: <h2 style={{ color: "white" }}>...Loading</h2>,
  }
);
 */
const Home = ({ auth }) => {
  return (
    <>
      <SEO />
      <ErrorBoundary>
        <main>
          <Photos />
        </main>
      </ErrorBoundary>
    </>
  );
};

export default Home;
