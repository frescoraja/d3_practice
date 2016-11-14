module.exports = {
  entry: "./public/index.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  }
};
