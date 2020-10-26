//check if current task is "dev" or "build"
const currentTask = process.env.npm_lifecycle_event;

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");
const Dotenv = require("dotenv-webpack");

let pages = fse
  .readdirSync("./src")
  .filter((file) => {
    return file.endsWith(".html");
  })
  .map((page) => {
    return new HtmlWebPackPlugin({
      filename: page,
      template: `./src/${page}`,
    });
  });

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./src/assets/images", "./build/assets/images");
    });
  }
}

// pages.push(new RunAfterCompile());

//cssLoaders

let cssConfig = {
  test: /\.(sa|sc|c)ss$/i,
  use: ["css-loader?url=false", "sass-loader"],
};

//common settings
let config = {
  entry: "./src/assets/js/main.js",
  module: {
    rules: [cssConfig],
  },
  plugins: [...pages]
};

//separate for "development"
if (currentTask === "dev") {
  cssConfig.use.unshift("style-loader");

  config.mode = "development";
  config.plugins.push(new Dotenv());
    config.output = {
      filename: "raahul.js",
      path: path.resolve(__dirname, "src"),
    };
  config.devServer = {
    before: function (app, server) {
      server._watch("./src/**/*.html");
    },
    contentBase: path.join(__dirname, "src"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  };
}

//separate for "production"
if (currentTask === "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  config.mode = "production";
  config.output = {
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    path: path.resolve(__dirname, "build"),
  };
  config.optimization = {
    splitChunks: { chunks: "all" },
  }; //separates vendors and custom scripts
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles-[chunkhash].css",
    }),
    new RunAfterCompile()
  );
}

module.exports = config;
