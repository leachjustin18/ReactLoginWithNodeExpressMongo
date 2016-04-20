/**
 * Created by Justin.Leach on 4/19/2016.
 */
// BASE SETUP
// =============================================================================

// call the packages we need
var webpack = require('webpack');
var config = require('./webpack.config');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    watchOptions: {
        aggregateTimeout: 10,
        poll: true
    }
}));



// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;


// // SET VIEW ENGINE
// // =============================================================================
// app.set('view engine', 'hbs');
//
// // SET WHERE OUR VIEWS ARE
// // =============================================================================
// app.set('views', __dirname + '/express/views');
//
// // REGISTER OUR ROUTES -------------------------------
// app.get('/', home);



//Specify where to look for CSS, JS, etc. 
app.use(express.static(path.join(__dirname, '/public')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Serving from  ' + port);



