const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extraSass = new ExtractTextPlugin({ filename:'styles.css', allChunks: true});

module.exports = {
    context: __dirname,

    entry: ['babel-polyfill', './client/index.tsx'],

    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'bundle.js',
        publicPath: "/",
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            path.join(__dirname, "client"),
            "node_modules"
        ]
    },

    plugins: [
        extraSass,
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
        }),
        new HtmlWebpackPlugin({
            title: 'Developer AnchorFree',
            template: 'public/index.ejs'
        })
    ],

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules/, /public/],
                loader: "babel-loader!eslint-loader!ts-loader"
            },
            {
                test: /\.js$/,
                exclude: path.join(__dirname, 'node_modules'),
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader',
                }),
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: false,
                                importLoaders: 2,
                            },
                        },
                        { loader: 'sass-loader' },
                    ],
                }),
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {limit: 10000, mimetype: 'mimetype=application/font-woff'},
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    {loader: 'file-loader', options: {name: '[name].[ext]'}},
                ],
            },
        ],
    },
};