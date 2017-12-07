const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/index.js'),
		// another: './src/another-module.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		}),
		// 更容易查看要修补的依赖
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new UglifyJSPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common' // 指定公共bundle的名称
		})
	],
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js', // 决定非入口chunk的名称
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	}
}