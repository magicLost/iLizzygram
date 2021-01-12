module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    /*  const rules = config.module.rules.filter((rule) => {
      if (rule && rule.test) {
        console.log(rule.test.toString().includes("tsx"));
        return rule.test.toString().includes("tsx");
      }
      return false; //rule.test.toString().includes("tsx");
    });

    rules[0].include.push(
      "/home/nikki/Documents/Project/lizzygram/fullstack_next_apollo_mongo/node_modules/react-components-lib-lost"
    ); */

    /* console.log("RULES LENGTH", rules.length);
    console.log(JSON.stringify(rules[0].include));
    console.log(JSON.stringify(rules[0].include[0]));
    console.log(JSON.stringify(rules[0].include[1]));

    for (let i in rules[0].include[1]) {
      console.log("--------------------");
      console.log(`${i} === ${rules[0].include[1][i]}`);
      console.log("--------------------");
    } */

    //return null;

    return config;
  },
};
