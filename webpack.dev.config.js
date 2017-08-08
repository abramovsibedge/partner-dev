'use strict';

const webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let path = require("path");

const extraSass = new ExtractTextPlugin('styles.css', {allChunks: true});
const extraBootstrap = new ExtractTextPlugin('bootstrap.css', {allChunks: true});
const srcPath = path.join(__dirname, 'app');

module.exports = {
    devtool: 'eval',
    entry: ["babel-polyfill", 'webpack-hot-middleware/client', "./app/app.tsx"],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
        root: [srcPath],
    },

    plugins:[
        new webpack.OldWatchingPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        extraSass,
        extraBootstrap
    ],

    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules/, /public/],
                loader: "babel!eslint!ts"
            },
            {
                test: /\.css$/,
                loader: extraBootstrap.extract('style', 'css!resolve-url')
            },
            {
                test: /\.scss$/,
                loader: extraSass.extract('style', 'css!resolve-url!sass?sourceMap!sass-resources')
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)([\?]?.*)$/,
                loader: 'file'
            }
        ]
    },
    sassResources: [],
    eslint: {
        configFile: 'eslint.json'
    }
};
