module.exports = {
  //stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  stories: ["../src/**/*.stories.js"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    //"@storybook/addon-essentials",
  ],
  /* typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  }, */
  webpackFinal: async config => {
    /*  config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
        },
      ],
    });  */

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
            // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
            //importLoaders: 1,
            // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
            modules: { auto: true },
          },
        },
        "sass-loader",
      ],
      //include: path.resolve(__dirname, "../"),
    });
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    //config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
