/** @type {import('next').NextConfig} */
const path = require("path");
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  /* bydefault config  option Read For More Optios
here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/
  cssModules: true,
});
module.exports = {
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, "./src/styles")],
  },
};
module.exports = {
  reactStrictMode: true,
  distDir: "./build",
  pagesDir: "./src/pages",
  env: {
    GRAPHQL_HOST: "http://localhost:5001/graphql",
    MAPBOX_TOKEN:
      "pk.eyJ1IjoidHVzcGhhbmFuaCIsImEiOiJja244eDFyMGkwM3R5MnVvbzI1eWZsYzNuIn0.jm4MGKDtKDMBpLz8IUXyAA",
  },
  images: {
    domains: ["avatars.dicebear.com"],
  },
};
