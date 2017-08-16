'use strict';

const webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let path = require("path");

const extraSass = new ExtractTextPlugin('styles.css', {allChunks: true});
const extraBootstrap = new ExtractTextPlugin('bootstrap.css', {allChunks: true});
const srcPath = path.join(__dirname, 'app');

module.exports = {
    entry: ["babel-polyfill", "./app/app.jsx"],
    output: {
        path: path.resolve(__dirname + "/public/build/"),
        filename: "bundle.js",
        publicPath: "/build/",
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
        root: [srcPath],
    },

    devtool: 'eval',

    plugins:[
        new webpack.OldWatchingPlugin(),
        extraSass,
        extraBootstrap,
        // new webpack.optimize.CommonsChunkPlugin({
        //     children: true,
        //     async: true,
        // }),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: false,
        //     comments: false,
        //     compress: {
        //         sequences: true,
        //         booleans: true,
        //         loops: true,
        //         unused: true,
        //         warnings: false,
        //         drop_console: true,
        //         unsafe: true
        //     }
        // })
    ],

    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules/, /public/],
                loader: "babel!eslint!ts"
            },
            {
                test: /\.jsx$/,
                exclude: [/node_modules/, /public/],
                loader: "babel",
                query: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /public/],
                loader: "babel",
                query: {
                    presets: ['es2015', 'stage-2', 'react']
                }
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
    sassResources: [],
    eslint: {
        configFile: 'eslint.json'
    }
};
