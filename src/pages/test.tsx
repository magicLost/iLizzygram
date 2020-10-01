import React from "react";
import Layout from "../component/Layout";
import { Link } from "gatsby";

const OtherPage = () => {
  return (
    <Layout>
      <div>Other page.</div>
      <Link to="/">Go home</Link>
    </Layout>
  );
};

export default OtherPage;
