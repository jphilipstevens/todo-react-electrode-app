const path = require("path");

module.exports = {
  module: {
    loaders: [{
      test: /\.css?$/,
      loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[hash]'],
      include: path.resolve(__dirname, '../dist/js')
    }]
  }
};
