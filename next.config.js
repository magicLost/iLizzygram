const withPlugins = require("next-compose-plugins");
const withPreact = require("next-plugin-preact");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins(
  [[withBundleAnalyzer], [withPreact]],

  {
    webpack: (config, { dev, isServer }) => {
      /* if (!isServer) {
        console.log("OPTIMIZATION", JSON.stringify(config.optimization));
      } */

      config.optimization.usedExports = true;

      return config;
    },
  }
);
