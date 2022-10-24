const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { resolve } = require("path");

module.exports = {
	entry: {
		app: "./src/app.js",
	},
	output: {
		path: resolve(__dirname, "./dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			// {
			// 	test: /\.(png|jpe?g|webp|git|svg|)$/i,
			// 	use: [
			// 		{
			// 			loader: "img-optimize-loader",
			// 			options: {
			// 				compress: {
			// 					mode: "high",
			// 				},
			// 			},
			// 		},
			// 	],
			// },
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				loader: "html-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,

				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "minify"],
					},
				},
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env", "minify"],
						},
					},
					"ts-loader",
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	optimization: {
		minimizer: [new CssMinimizerPlugin()],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "main.css",
			chunkFilename: "main.css",
		}),
		new CssMinimizerPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "./index.html", //relative to root of the application
		}),
		// new HtmlWebpackPlugin({
		// 	filename: "./html/contact.html",
		// 	template: "./src/html/contact.html",
		// }),
	],
	devServer: {
		static: {
			directory: resolve(__dirname, "dist"),
		},
		compress: true,
		port: 9000,
	},
};
