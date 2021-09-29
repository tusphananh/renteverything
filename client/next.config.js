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
    GRAPHQL_HOST: "https://api.renteverything.online",
  },
};
