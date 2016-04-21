/**
 * Created by Justin.Leach on 4/19/2016.
 */
var webpack = require('webpack');
var path = require('path');
var debug = process.env.NODE_ENV !== "production";
const BUILD_DIR = path.resolve(__dirname, 'public/JS');
const APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: APP_DIR + '/client.jsx',

    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/JS/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            }
        ]
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
};

module.exports = config;