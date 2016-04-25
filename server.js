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
var session = require('express-session');


app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/**
 * SESSIONS
 * ====================================================
 */
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, //original false. don't create session until something stored
    secret: 'shhhh, very secret'

}));

// Session-persisted message middleware

app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    req.session.cookie.expire = false;
    next();
});


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
 * AUTHENTICATION
 * =======================================
 */
function authenticate(name, pass, fn) {

    UserSchema.findOne({userName: name}, function (err, user) {
        if (!user) return fn(new Error('cannot find user'));
        // hash(pass, user.salt, function(err, hash){
        //     if (err) return fn(err);
        //     if (hash == user.hash) return fn(null, user);
        //     fn(new Error('invalid password'));
        // });

        if (user.password === pass) {
            return fn(null, user);
        } else {
            return fn(new Error('invalid password'));
        }
    });
}


// function restrict(req, res, next) {
//     if (req.session.user) {
//         next();
//     } else {
//         req.session.error = 'Access denied!';
//         res.redirect('/login');
//     }
// }


/**
 * ROUTING
 * =======================================
 */
//Post api/users
//Add a new user to the database.
app.post('/api/users', function (req, res, next) {
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
        res.redirect('/');
        console.info({message: firstName + ' has been added successfully!'});
    });
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
 * USER SESSIONS
 */
app.post('/api/users/session', function (req, res, next) {
//Login user
    var loginUserName = req.body.userName;
    var loginPassword = req.body.password;


    authenticate(loginUserName, loginPassword, function (err, user) {
        if (user) {
            req.session.regenerate(function () {
                req.session.user = user;
                res.redirect('/users');
                console.log('Logged in~ ' + user.userName);
            });
        } else {
            console.log('Something went wrong ' + err);
        }
    });
});


app.get('/api/users/session', function (req, res, next) {
    if (req.session.user) {

        UserSchema
            .find({userName: req.session.user.userName})
            .exec(function (err, users) {
                if (err) return console.error(err);
                return res.send(users);

            });

        // console.log("# Client user check "+ req.session.user);
        // res.json({data: req.session.user});
    }
});

/**
 * LOG USER OUT
 */

app.get('/logout', function(req, res){
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
        res.redirect('/');
    });
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
