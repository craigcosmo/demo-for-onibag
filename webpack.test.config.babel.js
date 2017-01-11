import openBrowser from 'open-browser-webpack-plugin'
import dir from 'webpack-directory-scan'
import {sitePort, siteUrl} from './app/config'
import path from 'path'
const hostname = 'localhost'
const port = 5051
const publicFolder = 'test/'


let myModules = dir.get('./','dist')

export default {
	entry: 'mocha!./test/index.js',
	output: {
		filename: 'test.build.js',
		path: path.join(__dirname, publicFolder),
		publicPath: 'http://' + hostname + ':' + port + '/test'
	},
	devServer: {
		host: hostname,
		port: port,
		contentBase: publicFolder,
		noInfo:true,
		progress:true,
		open:true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude : /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /(\.css|\.scss)$/,
				use: 'null-loader'
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/i,
				use: 'null-loader'
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/i,
				use: 'null-loader'
			},
			{
				test: /vendor\/.+\.(jsx|js)$/,
				use: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
			},
			{
				test: /sinon\.js$/,
				use: 'imports-loader?define=>false,require=>false'
			}
		]
	},
	resolve: {
		modules: [...myModules, 'node_modules']
	},
	externals: {
		'cheerio': 'window',
		'jsdom': 'window',
		'react/addons': true, // important!!
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true
	},
	node: {
		fs: 'empty' // this fixes 'can not resolve module fs'
	}
}
