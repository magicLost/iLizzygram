import React from "react";
import Layout from "../component/Layout";
import { Link } from "gatsby";
import SEO from "../component/SEO";

const OtherPage = () => {
  return (
    <Layout>
      <SEO title="Test" description="Page for test some features" />
      <div>Other page.</div>
      <Link to="/">Go home</Link>
    </Layout>
  );
};

export default OtherPage;
