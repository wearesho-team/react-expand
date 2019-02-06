// tslint:disable
const
    path = require('path'),
    webpack = require('webpack');

const
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    nodeExternals = require("webpack-node-externals");

const debug = process.env.NODE_ENV !== 'production';
const env = debug ? 'local' : 'production';

console.log("Building in " + env + " environment. Debug: " + debug.toString());

const config = {
        entry: {
            index: "./src/index.ts",
        },

        target: "node",
        externals: [nodeExternals()],

        output: {
            filename: 'index.js',
            path: path.resolve('./build'),
            publicPath: "/",
            library: "react-expand",
            libraryTarget: "umd",
        },

        devtool: debug ? "source-map" : false,
        mode: debug ? "development" : "production",

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
                        {
                            loader: "babel-loader",
                            query: {
                                presets: [
                                    '@babel/preset-react',
                                    ['@babel/preset-env', {
                                        "targets": {
                                            "browsers": ["last 2 versions", "safari >= 10", "ie >= 11"]
                                        },
                                        exclude: ["transform-regenerator"]
                                    }]
                                ],
                                "plugins": ["@babel/plugin-proposal-object-rest-spread"]
                            }
                        },
                        "awesome-typescript-loader"
                    ]
                },
                {
                    test: /\.jsx?$/,
                    exclude: [/node_modules/],
                    loader: "babel-loader",
                    query: {
                        presets: [
                            '@babel/preset-react',
                            ['@babel/preset-env', {
                                "targets": {
                                    "browsers": ["last 2 versions", "safari >= 10", "ie >= 11"]
                                },
                                exclude: ["transform-regenerator"]
                            }]
                        ],
                        "plugins": ["@babel/plugin-proposal-object-rest-spread"]
                    }
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ]
        },

        plugins: [
            new webpack.NamedModulesPlugin(),
            new CleanWebpackPlugin(path.resolve('./build')),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.NodeEnvironmentPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env)
                }
            })
        ]
    };

module.exports = config;