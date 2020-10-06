import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useStaticQuery, graphql } from "gatsby";

interface TestProps {}

const useStyles = makeStyles({
  root: {
    minWidth: "300px",
    maxWidth: "600px",
    minHeight: "200px",
    backgroundColor: "white",
    padding: "20px",
    textAlign: "center",
  },
});

const Test = ({}: TestProps) => {
  const classes = useStyles();

  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
  } = site.siteMetadata;

  return (
    <div className={classes.root}>
      <h1>Hello</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic est
        laboriosam nihil incidunt ratione iusto commodi omnis sit quae totam
        beatae recusandae, tempore at harum sed ipsum doloremque repudiandae
        necessitatibus.
      </p>
    </div>
  );
};

export default Test;

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
