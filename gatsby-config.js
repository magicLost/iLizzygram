/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

//const LoadablePlugin = require("@loadable/webpack-plugin");

/* exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
  });
}; */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Lizzygram",
    titleTemplate: "%s · The Real Hero",
    description:
      "Hogwarts Potions master, Head of Slytherin house and former Death Eater.",
    url: "https://lizzygram.com", // No trailing slash allowed!
    image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@occlumency",
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-sass`,
    "gatsby-plugin-webpack-bundle-analyser-v2",
  ],
};
