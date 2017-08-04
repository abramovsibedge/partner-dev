'use strict';

const webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let path = require("path");

const extraSass = new ExtractTextPlugin('styles.css', {allChunks: true});
const extraBootstrap = new ExtractTextPlugin('bootstrap.css', {allChunks: true});

module.exports = {
    entry: ["babel-polyfill", "./src/app.tsx"],
    output: {
        path: path.resolve(__dirname + "/public/build/"),
        filename: "bundle.js",
        publicPath: "/build/",
    },

    devtool: 'eval',

    plugins:[
        new webpack.OldWatchingPlugin(),
        extraSass,
        extraBootstrap,
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: "babel-loader!eslint-loader!ts-loader"
            },
            {
                test: /\.css$/,
                loader: extraBootstrap.extract('style', 'css!resolve-url')
            },
            {
                test: /\.scss$/,
                loader: extraSass.extract('style', 'css!resolve-url!sass?sourceMap!sass-resources')
            },

        ]
    },
    eslint: {
        configFile: 'eslint.json'
    },
    sassResources: ['./src/sass/settings/global.scss', './src/sass/settings/normalize.scss']
};
