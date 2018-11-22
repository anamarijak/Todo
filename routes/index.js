var express = require('express');
var router = express.Router();
var users = require('../utls/baza');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', taskic: '' });
});






module.exports = router;
