// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wp = require("@cypress/webpack-preprocessor");

module.exports = on => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            // every time webpack sees a TS file (except for node_modules)
            // webpack will use "ts-loader" to transpile it to JavaScript
            test: /\.ts(x)?$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: "ts-loader",
                options: {
                  // skip typechecking for speed
                  transpileOnly: true
                }
              }
            ]
          }
        ]
      }
    }
  };
  on("file:preprocessor", wp(options));
};
