module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
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
    return config;
  },
};
