import path from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: "./_src/app.js",
  output: {
    filename: "./assets/bundle.js",
    path: __dirname,
  },
  resolve: {
    extensions: ["*", ".js"],
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
          {
            loader: "css-loader",
            options: { minimize: true },
          },
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
    contentBase: path.join(__dirname, "_site"),
    disableHostCheck: true,
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
