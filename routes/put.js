var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index');
});

router.post('/board', function(req, res, next){
	var data = req.body;
	
	client.connect('mongodb://54.249.83.123:27017/newDB', function(err, db){
		var count_cursor = db.collection('counters2').findAndModify({id:'user_id'},[],{$inc:{seq:1}},{new:true},function(err, result){
			var new_seq = result.value.seq;
			
			data.seq = new_seq;
			
			var result_data = {};
			
			//board 테이블 접근후 seq 로 오름 차순 정렬 후 페이징
			var cursor = db.collection('board').insertOne(data, function(err, result){
				if(err != null){
					result_data = {
						code:500,
						message:err.message,
						desc:'INSERT FAILED'
					};
				}else{
					result_data = {
						code:200,
						message:'',
						desc:'INSERT SUCCESS'
					};
				}
				
				res.json(result_data);
			});
		});
	});
});

router.put('/board', function(req, res, next){
	var data = req.body;
	data.seq = parseInt(data.seq);
	var seq = data.seq;
	
	var result_data = {};
	
	client.connect('mongodb://54.249.83.123:27017/newDB', function(err, db){
		
		var cursor = db.collection('board').findAndModify(
			{seq:seq},
			[],
			{
				$set:data
			},
			{},
			function(err, result){
				if(err != null){
					result_data = {
						code:500,
						message:err.message,
						desc:'UPDATE FAILED'
					};
				}else{
					result_data = {
						code:200,
						message:'',
						desc:'UPDATE SUCCESS'
					};
				}			
				res.json(result_data);
			}
		);
	});
});

router.delete('/board', function(res, res, next){
	var data = req.body;
	data.seq = parseInt(data.seq);
	var seq = data.seq;
	
	var result_data = {};
	
	client.connect('mongodb://54.249.83.123:27017/newDB', function(err, db){
		var cursor = db.collection('board').remove(
			{
				seq:seq
			},
			function(err, result){
				if(err != null){
					result_data = {
						code:500,
						message:err.message,
						desc:'DELETE FAILED'
					}
				}else{
					result_data = {
						code:200,
						message:'',
						desc:'UPDATE_SUCCESS'
					}
				}
				res.json(result_data);
			}
		);
	});
});

module.exports = router;