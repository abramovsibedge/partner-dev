const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rupture = require('rupture');
const autoprefixer = require('autoprefixer');
const ReactStaticPlugin = require('react-static-webpack-plugin');

module.exports = {
	context: __dirname,

	entry: {
		app: [
			'./client/index.tsx',
		],
		vendor: './package.json'
	},

	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		modules: [
			path.join(__dirname, "client"),
			"node_modules"
		]
	},

	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			options: {
				postcss: [autoprefixer({browsers: ['last 2 versions']})],
				stylus: {
					use: [rupture()],
				},
			},
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			screw_ie8: true,
			sourceMap: true,
			compressor: {warnings: false},
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new ReactStaticPlugin({
			routes: './client/routes.tsx',
			template: './client/template.js',
		}),
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
								modules: true,
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