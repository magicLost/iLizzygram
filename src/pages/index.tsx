import React, { useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import Layout from "../component/Layout";
import IconButton from "@material-ui/core/IconButton";
import AdbIcon from "@material-ui/icons/Adb";
import Button from "@material-ui/core/Button";
import MaterialLink from "@material-ui/core/Link";
import { Link } from "gatsby";
import Backdrop from "@material-ui/core/Backdrop";
import ErrorBoundary from "../component/ErrorBoundary";
import SEO from "../component/SEO";

const LogoLoadable = loadable(
  //import(/* webpackPrefetch: true */ '../component/Logo')
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

const Home = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Layout>
      <SEO />

      <ErrorBoundary>
        <main>
          <div>Hello world from Lizzygram!</div>

          <Button onClick={() => setIsShow(prev => !prev)}>
            Show dynamic content.
          </Button>

          <MaterialLink
            color="secondary"
            to="/hello"
            component={Link}
            variant="body2"
          >
            Material link to hello page.
          </MaterialLink>
        </main>

        {/* Here place for our modals */}
        <Backdrop open={isShow}>{isShow && <LogoLoadable />}</Backdrop>
      </ErrorBoundary>
    </Layout>
  );
};

export default Home;
