const path = require("path");
const fs = require("fs");
const {
  isProductionEnv,
  isDevelopmentEnv,
} = require("rocketact-scripts/dist/utils/environment");
const {
  ensureTrailingSlash,
} = require("rocketact-dev-utils/dist/ensureTrailingSlash");

const { appPackageJson} = require('rocketact-dev-utils/dist/paths')
const appRoot = () => fs.realpathSync(process.cwd());
const resolveToAppRoot = (p) => path.resolve(appRoot(), p);

const pkg = JSON.parse(fs.readFileSync(appPackageJson()).toString());

module.exports = (api) => {
  api.chainWebpack((webpackChain) => {
    webpackChain.output
      .publicPath(
        isDevelopmentEnv()
          ? "/"
          : `${ensureTrailingSlash(process.env.npm_package_publicPath || "/")}${
            pkg.version
            }`
      )
      .path(
        isProductionEnv()
          ? resolveToAppRoot(`build/${pkg.version}/`)
          : "/"
      )
      .end();
  });
};
