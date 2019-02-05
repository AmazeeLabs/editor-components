const webpack = require("webpack");
const path = require("path");

const config = {
  entry: "./components/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["raw-loader"]
      }
    ]
  }
};

module.exports = config;
