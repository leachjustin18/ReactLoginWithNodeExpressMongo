/**
 * Created by Justin.Leach on 4/22/2016.
 */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('localhost/usersdb');

autoIncrement.initialize(connection);

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String
});

userSchema.plugin(autoIncrement.plugin, 'User');

module.exports = connection.model('User', userSchema);
