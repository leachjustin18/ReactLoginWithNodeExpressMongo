/**
 * Created by Justin.Leach on 4/19/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {
        layout: 'layout/shell'
    })
});

module.exports = router;
