module.exports = {
  module: {
    rules: [
      {
        test: /\.css|\.svg$/,
        use: "raw-loader"
      }
    ]
  }
};
