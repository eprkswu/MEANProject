var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('kyuhuck', { title: 'Express2' });
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

router.get('/face_book/:id', function(req, res, next){
	var id = req.params.id;

	res.render('facebook', {id:id});
});

router.get('/face_book_render/:id', function(req, res, next){
	var id = req.params.id;
	var image_url = "";

	if(id % 3 == 0){
		image_url = "http://image.bettyvelvet.me/images/thumbnail/htm_20160104103448237065_99_20160104103607_300-thumbnail.JPG";
	}else if(id % 4 == 0){
		image_url = "http://image.bettyvelvet.me/images/thumbnail/htm_20160104103448459474_99_20160104103607_300-thumbnail.JPG";
	}else if(id % 5 == 0){
		image_url = "http://image.bettyvelvet.me/images/thumbnail/htm_20160104103447789613_99_20160104103607_300-thumbnail.JPG";
	}else{
		image_url = "http://image.bettyvelvet.me/images/thumbnail/htm_20160104103447981551_99_20160104103607_300-thumbnail.JPG";
	}

	res.render('facebook_render', {id:id, image_url:image_url});
});

router.get('/face_book2/:id', function(req, res, next){
	var id = req.params.id;

	res.render('facebook2', {id:id});
});

router.get('/face_book_render2/:id', function(req, res, next){
	res.writeHead(302, {'Location' : 'http://w3.sbs.co.kr/tv/tvsectionMainImg.do?pgmCtg=T&pgmSct=ET&pgmSort=week&div=pc_enter'});
	res.end();
	var id = req.params.id;
	var image_url = "";

	if(id % 3 == 0){
		image_url = "http://image.bettyvelvet.me/images/thumbnail/htm_20160104103448237065_99_20160104103607_300-thumbnail.JPG";
	}else if(id % 4 == 0){
		image_url = "http://image.bettyvelvet.me/images/thumbnail/htm_20160104103448459474_99_20160104103607_300-thumbnail.JPG";
	}else if(id % 5 == 0){
		image_url = "http://image.bettyvelvet.me/images/thumbnail/htm_20160104103447789613_99_20160104103607_300-thumbnail.JPG";
	}else{
		image_url = "http://image.bettyvelvet.me/images/thumbnail/htm_20160104103447981551_99_20160104103607_300-thumbnail.JPG";
	}

	res.render('facebook_render', {id:id, image_url:image_url});
});


module.exports = router;
