import React, { useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import Layout from "../component/Layout";
import IconButton from "@material-ui/core/IconButton";
import AdbIcon from "@material-ui/icons/Adb";
import Button from "@material-ui/core/Button";
import MaterialLink from "@material-ui/core/Link";
import { Link } from "gatsby";
import SEO from "../component/SEO";
import Backdrop from "@material-ui/core/Backdrop";

const LogoLoadable = loadable(
  () => pMinDelay(import("./../component/Logo/Logo"), 300),
  {
    fallback: <h2 style={{ color: "white" }}>...Loading</h2>,
  }
);

const Home = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Layout>
      <SEO />

      <div>Hello world from Lizzygram!</div>

      <Button onClick={() => setIsShow(prev => !prev)}>
        Show dynamic content.
      </Button>

      <Backdrop open={isShow}>{isShow && <LogoLoadable />}</Backdrop>
    </Layout>
  );
};

export default Home;
