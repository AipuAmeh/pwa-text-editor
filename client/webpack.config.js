const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      new InjectManifest({
        SwSrc: "./src/src-sw.js",
        swDest: "service-worker.js.",
      }),
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'JATE',
        description: 'Text-editor progressive web application',
        background_color: '#E296E5',
        theme_color: '#E296E5',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('src', 'images'),
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?s$/,
          exclude: /(node_modules| bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
