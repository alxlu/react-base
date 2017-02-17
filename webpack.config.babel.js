import { join } from 'path';
import { readFileSync } from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const babelrc = JSON.parse(readFileSync(join(__dirname, '.babelrc')));

const options = (() => {
  if (process.env.NODE_ENV === 'production') {
    return {
      cssLoaders: ExtractTextPlugin.extract({
        loader: 'css-loader?modules&importLoaders=1!postcss-loader',
        fallbackLoader: 'style-loader',
      }),
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"',
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          mangle: true,
          compress: {
            warnings: false,
            dead_code: true,
            unused: true,
            drop_console: true,
          },
        }),
        new ExtractTextPlugin('[name].css'),
      ],
      performance: { hints: 'warning' },
    };
  }
  return {
    cssLoaders: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader',
    plugins: [],
    performance: { hints: false },
  };
})();

export default {
  entry: [
    join(__dirname, 'src/index.js'),
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: babelrc,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: options.cssLoaders,
    }],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: {
          plugins: [
            require('lost'),
            cssnext({ browsers: ['last 2 versions', 'IE > 10'] }),
          ],
        },
      },
    }),
    new HTMLWebpackPlugin({
      template: join(__dirname, 'src/index.html'),
      inject: true,
    }),
    ...options.plugins,
  ],

  output: {
    path: join(__dirname, 'dist'),
    filename: 'index.js',
  },

  performance: options.performance,
};
