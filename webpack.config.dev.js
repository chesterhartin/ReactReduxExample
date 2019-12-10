const webpack = require("webpack"); // common.js syntax for more compatibility
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web", // this could be node if we want our application to run on node
  devtool: "cheap-module-source-map", // should all be lowercase devTool doesn't work. for debugging purposes on the client side.
  entry: "./src/index",
  output: {
    // webpack doesn't output code in dev mode it merely serves form memory. However, we need this to know where in mmeory is the app being served from
    path: path.resolve(__dirname, "build"), // although it wouldn't be writing files to this diorectory, it would be serving from this directoiry from memory
    publicPath: "/", // specifies the public url of the output directory when it's referenced from the browser
    filename: "bundle.js" // doesn't generate one in the dev mode anyway
  },
  devServer: {
    stats: "minimal", // less verbose
    overlay: true, // overlay the errors that occur in the browser
    historyApiFallback: true, // all requests will be sent to index.html.Handing the complete routing responsibility to the react router module.
    // these following three settings are necessary to trouble shoot an open issue with webpack when using the latest version of chrome. Good to remove once those are resolved.
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    })
  ],
  module: {
    // tell webpack what files we want it to handle
    rules: [
      {
        test: /\.(js|jsx)$/, // regex to look for javascript or jsx files
        exclude: /node_modules/, // and ignore node modules
        use: ["babel-loader", "eslint-loader"] // tools to handle the above selected files
      },
      {
        test: /(\.css)$/, // look for css files
        use: ["style-loader", "css-loader"] // tools to handle the above selected files. Allows us to import css and webpack bundles them into one single css file
      }
    ]
  }
};

// why babel?
/*
modern js features to our browsers versions
Transpile modern JS
Compiles React JSX to javascript (jsx is not a valid javascript)
*/
