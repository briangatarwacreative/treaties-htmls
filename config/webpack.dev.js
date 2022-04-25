const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')

const paths = require('./paths')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  plugins: [
    /**
     * DLL Reference Plugin
     *
     * Optimizes speed for webpack by not rebuilding less changed libraries(files).
     *
     * References the already bundled files
     */

    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('../public/assets/js/library-manifest.json'),
    }),
  ],
})
