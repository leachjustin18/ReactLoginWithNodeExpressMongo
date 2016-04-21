/**
 * Created by Justin.Leach on 4/21/2016.
 */
var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var WebpackConfig = require('./webpack.config');
var path = require('path');
var fs = require('fs');
var mainPath = path.resolve(__dirname, 'app', 'client.jsx');

module.exports = function() {
    var bundleStart = null;
    var compiler = Webpack(WebpackConfig);

    compiler.plugin('compile', function() {
       console.info('Bundling...')
        bundleStart = Date.now();
    });

    compiler.plugin('done', function () {
        console.info('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    var bundler = new WebpackDevServer(compiler, {
        publicPath: '/public/',
        hot: true,

        quiet: false,
        noInfo: true,
        stats: {
            color: true
        }
    });
    
    bundler.listen(8080, 'localhost', function() {
       console.log('Bundling project') 
    });

};

//module.exports = config;















