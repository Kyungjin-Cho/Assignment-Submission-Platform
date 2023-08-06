// Import MiniCssExtractPlugin to extract CSS into separate files
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Import path module to handle file and directory paths
const path = require("path");

// Definie the base path for JavaScript source files
const BASE_JS = "./src/client/js/";

// Webpack configuration object
module.exports = {
  // Entry points for the application
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
    confirmDelete: BASE_JS + "confirmDelete.js",
  },
  // Plugins for handling CSS
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css", // Naming the extracted CSS file
    }),
  ],
  // Output configuration for the bundled files
  output: {
    filename: "js/[name].js", 
    path: path.resolve(__dirname, "assets"), 
    clean: true, // Cleans the output directory before a build
  },
  // Module configuration with rules to handle different file types
  module: {
    rules: [
      {
        test: /\.js$/, 
        use: {
          loader: "babel-loader", // Use Babel to transpile JS
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]], 
          },
        },
      },
      {
        test: /\.scss$/, // Handling SCSS files
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], 
      },
    ],
  },
};
