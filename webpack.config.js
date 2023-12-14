const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const utwm = require('unplugin-tailwindcss-mangle/webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { resolve } = require('path');
const { exec } = require('child_process');

module.exports = {
	mode: 'development',
	entry: {
		main: resolve(__dirname, 'src', 'index.tsx'),
	},
	output: {
		filename: 'app.js',
		path: resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?/,
				use: ['babel-loader'],
				exclude: /node_moudles/,
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', , 'sass-loader'],
			},
		],
	},
	plugins: [
		new WebpackBeforeBuildPlugin(async function (stats, callback) {
			exec('yarn prepare', (err, stdout, stderr) => {
				if (err) {
					console.log(err);
					return;
				}
				console.log(stdout);
			});
			callback();
		}),
		new HtmlWebpackPlugin({
			template: resolve(__dirname, 'public', 'index.html'),
			inject: 'body',
			favicon: resolve(__dirname, 'public', 'favicon.png'),
		}),
		new MiniCssExtractPlugin({
			filename: 'app.css',
		}),
		utwm(),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new HtmlMinimizerPlugin({
				minify: HtmlMinimizerPlugin.swcMinify,
				minimizerOptions: {},
			}),
			new CssMinimizerPlugin(),
		],
	},
	devServer: {
		port: 8080,
	},
};
