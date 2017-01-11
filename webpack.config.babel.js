import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import OpenBrowserPlugin from 'open-browser-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import {sitePort, siteUrl} from './app/config'
import dir from 'webpack-directory-scan'

import ProgressBarPlugin from 'progress-bar-webpack-plugin'



let modulesDirectories = dir.get('./','dist')

let port = sitePort
let env = process.env.NODE_ENV

let sourceMap = 'source-map'
let buildFolder = 'dist/development/'
let publicPath = siteUrl+buildFolder



if (env === 'production') {
	sourceMap = ''
	buildFolder = 'dist/production/'
	publicPath = siteUrl
}


export default {
	devtool: sourceMap,
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, buildFolder),
		publicPath: publicPath
	},
	devServer: {
		historyApiFallback: true,
		contentBase: buildFolder,
		noInfo: true,
		port: port
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.(css|scss)$/,
				loader: ExtractTextPlugin.extract(
					'style?sourceMap',
					'css?sourceMap&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
					'resolve-url',
					'sass?sourceMap'
				)
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/i,
				loader: 'file?name=/font/[name].[ext]'
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/i,
				loader: 'file?name=/image/[name].[ext]'
			},
			{
				test: /vendor\/.+\.(jsx|js)$/,
				loader: 'imports?jQuery=jquery,$=jquery,this=>window'
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json'
			}
		]
	},
	resolve: {
		modulesDirectories: [...modulesDirectories, 'node_modules']
	},
	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV']),
		// if env==='devserver' no folder will be deleted
		new CleanWebpackPlugin([buildFolder],{dry: env==='devserver',verbose: false}),
		new CopyWebpackPlugin([
			{from: 'app/image', to: 'image'}
		]),
		new ExtractTextPlugin('bundle.css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			filename: 'index.html',
			inject: 'body',
			hash: true
		}),
		new OpenBrowserPlugin({ 
			url: 'http://localhost:'+port, 
			browser: 'google chrome'
		}),
		new ProgressBarPlugin()

	]
}
