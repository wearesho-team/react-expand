// tslint:disable
const
    path = require('path'),
    webpack = require('webpack');

const
    CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin,
    nodeExternals = require("webpack-node-externals");

const debug = process.env.NODE_ENV !== 'production';
const env = debug ? 'local' : 'production';

console.log("Building in " + env + " environment. Debug: " + debug.toString());

const config = {
        entry: ["./src/index.ts"],
        target: "node",
        externals: [nodeExternals()],

        output: {
            filename: 'index.js',
            path: path.resolve('./build'),
            publicPath: "/",
            library: "react-criteria-table",
            libraryTarget: "umd",
        },

        devtool: debug ? "source-map" : false,

        resolve: {
            extensions: [".ts", ".js", ".json", ".jsx", ".tsx",],
            modules: [
                path.resolve('node_modules'),
                path.resolve('src'),
            ],
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loaders: [
                        "babel-loader",
                        "awesome-typescript-loader"
                    ]
                },
                {
                    test: /\.jsx?$/,
                    exclude:
                        [/node_modules/],
                    loader:
                        "babel-loader",
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new webpack.NodeEnvironmentPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env)
                }
            })
        ]
    };

module.exports = config;
