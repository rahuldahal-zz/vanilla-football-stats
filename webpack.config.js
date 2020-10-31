//check if current task is "dev" or "build"
const currentTask = process.env.npm_lifecycle_event;

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");
const Dotenv = require("dotenv-webpack");

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./src/assets/images", "./build/assets/images");
    });
  }
}


//cssLoaders

let cssConfig = {
  test: /\.(sa|sc|c)ss$/i,
  use: ["css-loader?url=false", "sass-loader"],
};

let ejsLoader = {
  test: /\.ejs$/, 
  use: {
    loader: 'ejs-compiled-loader',
    options: {
      htmlmin: true,
      htmlminOptions: {
        removeComments: true
      }
    }
  }
}


//common settings
let config = {
  entry: "./src/assets/js/main.js",
  module: {
    rules: [cssConfig, ejsLoader],
  },
  plugins: [new HtmlWebPackPlugin({
    filename: 'index.html',
    template: './src/template/index.template.ejs',
    devServer: "http://localhost:5000"
  })],
  output: {
    publicPath: "/"
  }
};

//separate for "development"
if (currentTask === "dev") {
  cssConfig.use.unshift("style-loader");

  config.mode = "development";
  config.plugins.push(new Dotenv());
  // config.watch = true;
  config.output = {...config.output,
    filename: "bundled.js",
    path: path.resolve(__dirname, "src"),
  };
}

//separate for "production"
if (currentTask === "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  config.mode = "production";
  config.output = {...config.output,
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
