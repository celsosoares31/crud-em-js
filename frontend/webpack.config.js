const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 3000,
  },
};
