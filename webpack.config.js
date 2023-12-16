const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const utwm = require('unplugin-tailwindcss-mangle/webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const { resolve } = require('path');
const { exec } = require('child_process');

module.exports = {
	mode: 'development',
	entry: {
		main: resolve(__dirname, 'src', 'index.tsx'),
	},
	output: {
		filename: '[name].[contenthash].js',
		path: resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin({
			configFile: "./tsconfig.json",
			logLevel: "info",
			extensions: [".ts", ".tsx"],
		})]
	},
	module: {
		rules: [
			{
				test: /\.tsx?/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', , 'sass-loader'],
			},
		],
	},
	plugins: [
		new WebpackBeforeBuildPlugin(async function (stats, callback) {
			exec('npm run prepare', (err, stdout, stderr) => {
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
		new ImageMinimizerPlugin({
			minimizer: {
			  implementation: ImageMinimizerPlugin.svgoMinify,
			  options: {
				encodeOptions: {
				  multipass: true,
				  plugins: [
					"preset-default",
				  ],
				},
			  },
			},
		  }),
		  new ImageMinimizerPlugin({
			minimizer: {
			  implementation: ImageMinimizerPlugin.sharpMinify,
			  options: {
				encodeOptions: {
				  jpeg: {
					// https://sharp.pixelplumbing.com/api-output#jpeg
					quality: 100,
				  },
				  webp: {
					// https://sharp.pixelplumbing.com/api-output#webp
					lossless: true,
				  },
				  avif: {
					// https://sharp.pixelplumbing.com/api-output#avif
					lossless: true,
				  },

				  // https://sharp.pixelplumbing.com/api-output#png
				  png: {},

				  // https://sharp.pixelplumbing.com/api-output#gif
				  gif: {},
				},
			  },
			},
		  }),
		new CopyPlugin({
			patterns: [{ from: 'public/static', to: 'static' }],
		}),
		new MiniCssExtractPlugin({
			filename: 'app.css',
		}),
		utwm(),
	],
	optimization: {
		minimize: true,
		moduleIds: 'deterministic',
		minimizer: [
			new HtmlMinimizerPlugin({
				minify: HtmlMinimizerPlugin.swcMinify,
				minimizerOptions: {},
			}),
			new CssMinimizerPlugin(),
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
					},
					mangle: true,
				},
			}),
		],
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
			  vendor: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendors',
				chunks: 'all',
			  },
			},
		  },
	},
	devServer: {
		port: 8080,
	},
	cache: true,
};
