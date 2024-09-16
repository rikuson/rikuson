import path from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: "./_src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "assets"),
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "~": path.join(__dirname, "_src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "esbuild-loader",
          options: {
            target: "es2015",
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: "raw-loader",
        },
      },
    ],
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, "_site"),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  mode: process.env.NODE_ENV,
};

export default config;
