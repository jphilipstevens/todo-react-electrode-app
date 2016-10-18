import _ from "lodash";
import Path from "path";


const getAssets = (stats) => {
  const assets = {};
  _.each(stats.assetsByChunkName.main, (v) => {
    if (v.endsWith(".js")) {
      assets.js = v;
    } else if (v.endsWith(".css")) {
      assets.css = v;
    }
  });
  return assets;
};


/**
 * Load stats.json which is created during build.
 * The file contains bundle files which are to be loaded on the client side.
 *
 * @param {string} statsFilePath - path of stats.json
 * @returns {Promise.<Object>} an object containing an array of file names
 */
const getAssetsFromStats = (statsFilePath) => {
  const absolutePath = Path.resolve(statsFilePath);
  return Promise.resolve(absolutePath)
    .then(require)
    .then(getAssets)
    .catch(() => ({}));
};

export default getAssetsFromStats;
