const path = require("path");
const fs = require("fs");
const {
  isProductionEnv,
  isDevelopmentEnv,
} = require("rocketact-scripts/dist/utils/environment");
const {
  ensureTrailingSlash,
} = require("rocketact-dev-utils/dist/ensureTrailingSlash");

const appRoot = () => fs.realpathSync(process.cwd());
const resolveToAppRoot = (p) => path.resolve(appRoot(), p);

module.exports = (api) => {
  api.chainWebpack((webpackChain) => {
    webpackChain.output
      .publicPath(
        isDevelopmentEnv()
          ? "/"
          : `${ensureTrailingSlash(process.env.npm_package_publicPath || "/")}${
              process.env.npm_package_version
            }`
      )
      .path(
        isProductionEnv()
          ? resolveToAppRoot(`build/${process.env.npm_package_version}/`)
          : "/"
      )
      .end();
  });
};
