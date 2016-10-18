import _ from "lodash";
import Path from "path";

/**
 * Resolve the content that will fill the page.
 *
 *
 * @param {string, function, object} content - the content to use for the page.
 * an object will have a module property that is a path to the content loader
 * @returns {Promise.<Object>} an object containing an array of file names
 */
const resolveContent = (content) => {
  if (!_.isString(content) && !_.isFunction(content) && content.module) {
    const module = content.module.startsWith(".")
      ? Path.join(process.cwd(), content.module)
      : content.module; // eslint-disable-line
    return require(module); // eslint-disable-line
  }

  return content;
};

export default resolveContent;
