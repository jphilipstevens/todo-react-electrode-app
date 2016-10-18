const pluginOptionsDefaults = {
  pageTitle: "Untitled",
  webpackDev: process.env.WEBPACK_DEV === "true",
  renderJS: true,
  serverSideRendering: true,
  devServer: {
    host: "127.0.0.1",
    port: "2992"
  },
  paths: {},
  stats: "dist/server/stats.json"
};

export default pluginOptionsDefaults;
