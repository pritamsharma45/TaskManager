const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../deploy/gas"),
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new HtmlWebpackPlugin({
      template: "client/src/index.html",
      inlineSource: ".(js|css)$",
    }),
    new HtmlWebpackInlineSourcePlugin(),
   //  new RemovePlugin({
   //    after: {
   //      include: ["./deploy/gas/1.bundle.js"],
   //    },
   //  }),
  ],
});
