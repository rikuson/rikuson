const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const config = {
  entry: './_src/app.js',
  output: {
    filename: './assets/bundle.js',
    path: __dirname,
  },
  resolve: {
    extensions: ['*', '.js'],
    alias: {
      '~': path.join(__dirname, '_src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', options: { minimize: true },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, '_site'),
    disableHostCheck: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  mode: process.env.NODE_ENV,
};

if(process.env.NODE_ENV === 'production'){
  config.plugins.push(new MinifyPlugin({}, {}));
}

module.exports = config;

