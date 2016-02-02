var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index');
});

module.exports = router;

