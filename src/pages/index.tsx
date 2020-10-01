import React from "react";
import Layout from "../component/Layout";
import ButtonLink from "../component/ButtonLink";
import IconButton from "@material-ui/core/IconButton";
import AdbIcon from "@material-ui/icons/Adb";
import Button from "@material-ui/core/Button";
import MaterialLink from "@material-ui/core/Link";
import { Link } from "gatsby";

interface IHomeProps {
  hello: string;
}

const Home = () => {
  return (
    <Layout>
      <div>Hello world from Lizzygram!</div>
      {/* <Link to="/test">Go to other page.</Link> */}
      <IconButton aria-label="Home page" component={ButtonLink} href="/">
        <AdbIcon />
      </IconButton>

      <Button aria-label="Home page" component={ButtonLink} href="/test">
        Go to test page
      </Button>

      <MaterialLink href="/test" component={ButtonLink} variant="body2">
        Material link to test
      </MaterialLink>
    </Layout>
  );
};

export default Home;
