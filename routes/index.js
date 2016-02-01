var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
var path = require('path');
var appRoot = require('app-root-path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express2' });
});

/* MongoDB TEST Source */
router.get('/mongo', function(req, res, next){
	var data = '';
	client.connect('mongodb://54.249.83.123:27017/newDB', function(err, db){
		
		var doc = db.collection('users');
		var cursor = doc.find();
		
		doc.count(function(err, count){
			console.log(count);
		});
		
		cursor.toArray(function(err, items){
			res.send(items);
		});
		
		//db.close();
	});
});

router.post('/test', function(req, res, next){
	console.log(req.body.content);
	var obj = {};
	obj.code = 200;
	obj.message = 'success';
	res.send(obj);
});

module.exports = router;
