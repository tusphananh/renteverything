/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: "./build",
  pagesDir: "./src/pages",
  env: {
    GRAPHQL_HOST: "http://localhost:5000/graphql",
  },
};
