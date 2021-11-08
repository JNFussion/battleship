const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "development",
  cache: false,
  entry: {
    index: "./src/index.js",
    canvas: "./src/canvas.js",
    dom: {
      import: "./src/dom.js",
      dependOn: "canvas",
    },
    gameboard: "./src/gameboard.js",
    player: {
      import: "./src/player.js",
      dependOn: "gameboard",
    },
    game: {
      import: "./src/game.js",
      dependOn: "player",
    },
    ship: "./src/ship.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: "./src/index.html",
      favicon: "./src/icons/ship-solid.svg",
    }),
    new ESLintPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,

        type: "asset/resource",
      },
    ],
  },
};
