/**
 * Created by Justin.Leach on 4/19/2016.
 */
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var home = require('./express/routes/index');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;


// SET VIEW ENGINE
// =============================================================================
app.set('view engine', 'hbs');

// SET WHERE OUR VIEWS ARE
// =============================================================================
app.set('views', __dirname + '/express/views');

// REGISTER OUR ROUTES -------------------------------
app.get('/', home);

// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Magic happens on port ' + port);



