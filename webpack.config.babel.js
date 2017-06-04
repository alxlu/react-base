import { join } from 'path';
import { readFileSync } from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const babelrc = JSON.parse(readFileSync(join(__dirname, '.babelrc')));

export const setOptions = (prod) => {
  if (process.env.NODE_ENV === 'production' || prod) {
    return {
      css: {
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1!postcss-loader',
        }),
      },
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
        new ExtractTextPlugin({ filename: '[name].css' }),
      ],
      performance: { hints: 'warning' },
    };
  }
  return {
    css: { loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader' },
    plugins: [],
    performance: { hints: false },
    devtool: 'source-map',
  };
};

export const createConfig = options => ({
  entry: [join(__dirname, 'src/index.js')],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: babelrc,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      ...options.css,
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

  devtool: options.devtool,
  performance: options.performance,
});

export default createConfig(setOptions());
