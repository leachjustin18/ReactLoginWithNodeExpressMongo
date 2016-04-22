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

//MongoDB
var mongoose = require('mongoose');
var UserSchema = require('./models/user');
var dbConfig = require('./dbconfig');


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
 * CONNECT TO MONGOOSE
 * ========================================
 */
mongoose.connect(dbConfig.database);
mongoose.connection.on('error', function () {
    console.warn('Error: Could not connect to MongoDB.  Did you forget to run `mondgod');
});


/**
 * ROUTING
 * =======================================
 */
//Post api/users
//Add a new user to the database.
app.post('/api/users', function (req, res, next) {
    if (req.body.saveUser === true) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var username = req.body.userName;
        var password = req.body.password;

        var user = UserSchema({
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: username,
            password: password
        });

        user.save(function (err) {
            if (err) return console.error(err);
            res.redirect('/users');
            console.info({message: firstName + ' has been added successfully!'});
        });
    } else {
        var userName = req.body.userName;
        var password = req.body.password;

        console.log(userName + ' ' + password);
    }
});

app.get('/api/users', function (req, res, next) {
    UserSchema
        .find({})
        .exec(function (err, users) {
            if (err) return console.error(err);
            return res.send(users);

        })
});


/**
 * REACT ROUTER SERVER SIDE
 */
app.use(function (req, res) {
    Router.match({routes: routes.default, location: req.url}, function (err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
            var page = swig.renderFile('views/index.html', {html: html});
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

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
