'use strict';

const webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let path = require("path");

const extraSass = new ExtractTextPlugin('styles.css', {allChunks: true});
const extraBootstrap = new ExtractTextPlugin('bootstrap.css', {allChunks: true});

module.exports = {
    devtool: 'eval',
    entry: ["babel-polyfill", 'webpack-hot-middleware/client', "./src/app.tsx"],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/build/'
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
                test: /\.js$/,
                exclude: [/node_modules/, /public/],
                loader: "babel",
                query: {
                    presets: ['es2015', 'react', 'stage-2']
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
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)([\?]?.*)$/,
                loader: 'file'
            },
            {
                test: /\.ts(x?)$/,
                loader: "babel-loader!eslint-loader!ts-loader"
            }
        ]
    },

    sassResources: ['./src/sass/settings/global.scss', './src/sass/settings/normalize.scss'],
    eslint: {
        configFile: 'eslint.json'
    }
};
