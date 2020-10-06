import React from "react";
import Helmet from "react-helmet";
//import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO = ({ title, description }: SEOProps) => {
  //const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    //url: `${siteUrl}${pathname}`,
  };

  console.log("[RENDER SEO]", seo.description);

  return (
    <Helmet titleTemplate={titleTemplate}>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
    </Helmet>
  );
};

export default React.memo(SEO);

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
      }
    }
  }
`;
