const paths = require('./paths')
const webpack = require('webpack')

module.exports = {
  // Where webpack outputs the assets and bundles
  output: {
    path: `${paths.public}/assets/js`,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  /*  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
 */

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '../imgs/[name][ext][query]',
        },
      },

      // Fonts and SVGs: Copy font files to build folder
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        generator: {
          filename: '../fonts/[name][ext][query]',
        },
      },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
      $: `${paths.nodeModules}/jquery/dist/jquery.min`,
      'window.jQuery': `${paths.nodeModules}/jquery/dist/jquery.min`,
      jQuery: `${paths.nodeModules}/jquery/dist/jquery.min`,
    },
  },
  /*  externals: {
    jquery: 'jQuery',
  }, */
}
