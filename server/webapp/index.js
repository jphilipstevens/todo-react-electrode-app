import _ from "lodash";
import Promise from "bluebird";
import fs from "fs";
import Path from "path";
import assert from "assert";

import resolveContent from "./resolve-content";
import getAssetsFromStats from "./get-assets-from-stats";
import pluginOptionsDefaults from "./defaults";

const HTTP_ERROR_500 = 500;
const HTTP_REDIRECT = 302;


const makeRouteHandler = (options, userContent) => {
  const CONTENT_MARKER = "{{SSR_CONTENT}}";
  const BUNDLE_MARKER = "{{WEBAPP_BUNDLES}}";
  const TITLE_MARKER = "{{PAGE_TITLE}}";
  const PREFETCH_MARKER = "{{PREFETCH_BUNDLES}}";
  const WEBPACK_DEV = options.webpackDev;
  const RENDER_JS = options.renderJS;
  const RENDER_SS = options.serverSideRendering;
  const html = fs.readFileSync(Path.join(__dirname, "index.html")).toString();
  const assets = options.__internals.assets;
  const devJSBundle = options.__internals.devJSBundle;
  const devCSSBundle = options.__internals.devCSSBundle;

  /* Create a route handler */
  return (request, reply) => {
    const mode = request.query.__mode || "";
    const renderJs = RENDER_JS && mode !== "nojs";
    const renderSs = RENDER_SS && mode !== "noss";

    const bundleCss = () => {
      return WEBPACK_DEV ? devCSSBundle : assets.css && `/js/${assets.css}` || "";
    };

    const bundleJs = () => {
      if (!renderJs) {
        return "";
      }
      return WEBPACK_DEV ? devJSBundle : assets.js && `/js/${assets.js}` || "";
    };

    const callUserContent = (content) => {
      const x = content(request);
      return !x.catch ? x : x.catch((err) => {
        return Promise.reject({
          status: err.status || HTTP_ERROR_500,
          html: err.message || err.toString()
        });
      });
    };

    const makeBundles = () => {
      const css = bundleCss();
      const cssLink = css ? `<link rel="stylesheet" href="${css}" />` : "";
      const js = bundleJs();
      const jsLink = js ? `<script src="${js}"></script>` : "";
      return `${cssLink}${jsLink}`;
    };

    const addPrefetch = (prefetch) => {
      return prefetch ? `<script>${prefetch}</script>` : "";
    };

    const renderPage = (content) => {
      return html.replace(/{{[A-Z_]*}}/g, (m) => {
        switch (m) {
          case CONTENT_MARKER:
            return content.html || "";
          case TITLE_MARKER:
            return options.pageTitle;
          case BUNDLE_MARKER:
            return makeBundles();
          case PREFETCH_MARKER:
            return addPrefetch(content.prefetch);
          default:
            return `Unknown marker ${m}`;
        }
      });
    };

    const renderSSRContent = (content) => {
      const p = _.isFunction(content) ?
        callUserContent(content) :
        Promise.resolve(_.isObject(content) ? content : {
          html: content
        });
      return p.then((c) => renderPage(c));
    };

    const handleStatus = (data) => {
      const status = data.status;
      if (status === HTTP_REDIRECT) {
        reply.redirect(data.path);
      } else {
        reply({
          message: "error"
        }).code(status);
      }
    };

    const doRender = () => {
      return renderSs ? renderSSRContent(userContent) : renderPage("");
    };

    Promise.try(doRender)
      .then((data) => {
        return data.status ? handleStatus(data) : reply(data);
      })
      .catch((err) => {
        reply(err.html).code(err.status || HTTP_ERROR_500);
      });
  };
};

const registerRoutes = (server, options, next) => {

  const pluginOptions = _.defaultsDeep({}, options, pluginOptionsDefaults);

  return Promise.try(() => getAssetsFromStats(pluginOptions.stats))
    .then((assets) => {
      const devServer = pluginOptions.devServer;

      pluginOptions.__internals = {
        assets,
        devJSBundle: `http://${devServer.host}:${devServer.port}/js/bundle.dev.js`,
        devCSSBundle: `http://${devServer.host}:${devServer.port}/js/style.css`
      };

      _.each(options.paths, (config, path) => {
        assert(config.content, `You must define content for the webapp plugin path ${path}`);
        server.route({
          method: "GET",
          path,
          config: config.config || {},
          handler: makeRouteHandler(pluginOptions, resolveContent(config.content))
        });
      });
      next();
    })
    .catch(next);
};

registerRoutes.attributes = {
  pkg: {
    name: "webapp",
    version: "1.0.0"
  }
};

export default registerRoutes;
