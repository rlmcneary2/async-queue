"use strict";


const path = require("path");
const webpack = require("webpack");


const _SOURCE_DIR = "src";
const _OUTPUT_DIR = "dist";


const babelOptions = {
    plugins: [],
    presets: ["es2015", "es2016", "es2017"],
    retainLines: true,
};

/**
 * @module
 * This is a webpack2 configuration file.
 */
module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, _OUTPUT_DIR),
        inline: true
    },
    devtool: "source-maps",
    entry: `./index.ts`,
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions
                    },
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            useBabel: true,
                            useCache: true,
                            babelOptions
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions
                    }
                ]
            }
        ]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, _OUTPUT_DIR)
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env": { NODE_ENV: process.env.NODE_ENV } }),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ],
    resolve: {
        extensions: [".ts"]
    },
    target: "web"
};