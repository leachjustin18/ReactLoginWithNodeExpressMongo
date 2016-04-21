// Babel ES6/JSX Compiler
require('babel-register');
/**
 * BASE SETUP
 * ===========================================================
 */

//Pull NPM packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');

//Webpack
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);

//React
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes.jsx');
var swig = require('swig');

//Server
var server = require('http').createServer(app);
app.set('port', process.env.PORT || 8080);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



/**
 * RECOMPILE JSX FILES WITH WEBPACK VIA NODE
 * =======================================
 */
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: {
        aggregateTimeout: 10,
        poll: false
    }
}));


/**
 * REACT ROUTER SERVER SIDE
 */
app.use(function (req, res) {
    Router.match({routes: routes.default, location: req.url}, function (err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('views/index.html', {html: html});
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

//This is a stand in until react router
// app.get('*', function (request, response) {
//     response.sendFile(path.resolve(__dirname, 'views', 'index.html'))
// });

/**
 * PATH TO LOOK FOR LOCAL FILES
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * CONNECT TO THE SERVER
 */
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
