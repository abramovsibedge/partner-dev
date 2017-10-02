const path = require('path');
const webpack = require('webpack');
const rupture = require('rupture');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',

  entry: {
    app: [
			'babel-polyfill',
      './client/index.tsx',
    ],
  },

  output: {
    path: path.join(__dirname, 'public'),
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
    new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			Promise: 'es6-promise-promise',
		}),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
        stylus: {
          use: [rupture()],
        },
      },
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
        include: path.join(__dirname, 'client'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'mimetype=application/font-woff' },
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
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
        ],
      },
    ],
  },
};
