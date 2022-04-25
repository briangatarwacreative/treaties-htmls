const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const paths = require("./paths");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: {
    /**
     * Libraries
     *
     * The less changed files that don't need rebuilding.
     */
    library: [
      "@fortawesome/fontawesome-free/css/all.min.css",
      "bootstrap-icons/font/bootstrap-icons.css",
      "magnific-popup/dist/magnific-popup.css",
      "swiper/css/bundle",
      "jquery",
      "tw-elements",
      "magnific-popup/dist/jquery.magnific-popup.min",
      "swiper/bundle",
    ],
  },

  mode: "production",
  devtool: false,
  output: {
    path: `${paths.public}/assets/js`,
    filename: "[name].dll.js",
    library: "[name]",
    publicPath: "",
    assetModuleFilename: "assets/[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../assets/" },
          },

          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: "../css/library.css",
    }),

    /**
     * DLL Plugin
     *
     * Optimizes speed for webpack by not rebuilding less changed libraries(files)
     *
     * Creates a 'manifest' for the webapck.dev to connect too
     */

    new webpack.DllPlugin({
      name: "[name]",
      path: `${paths.public}/assets/js/[name]-manifest.json`,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
