/* 게시판 관련 api from jung - kyu - huck */

// node js 조건부 설정
var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express2' });
});


// 게시판 리스트 얻어오는 api
router.get('/board_list.json', function(req, res, next){
	var start = req.query.start; //시작페이지
	//시작 페이지가 null이면0으로
	if(start ==null){
		start ="0";
	}

	var seq = req.query.seq; //현재시퀀스 페이지
	var seq ;
	var id  = req.query.id; //현재시퀀스 페이지

	//a몽고 db연결
	client.connect('mongodb://54.249.83.123:27017/newDB', function(err, db){

		//board 테이블 접근후 seq 로 오름 차순 정렬 후 페이징
		var cursor = db.collection('board').find().sort({seq:-1}).skip(parseInt(start)).limit(10)

		//게시판 카운팅
		db.collection('board').count(function (err,count){
			var jsonarray  = new Array();
			var jsonobj  = new Object();
			cursor.toArray(function(err, items){
				jsonobj.total_list = count;

				for (i = 0; i < items.length; i++) {
					title = items[i].title;
					content = items[i].content;
					jsonarray.push(items[i]);

				}
				var totalInfo = new Object(jsonobj);
				totalInfo.persons = jsonarray;
				var jsonInfo = JSON.stringify(totalInfo);
				res.send(jsonInfo);
			});

		});


	});
});

// 게시판 세부 정보 를 얻어오는 api
router.get('/board_detail.json', function(req, res, next){
	var seq = req.query.seq; // 게시글 번호

	client.connect('mongodb://54.249.83.123:27017/newDB', function(err, db){

		var ObjectID = require('mongodb').ObjectID;
		var cursor = db.collection('board').find({"seq" : parseInt(seq)});


		cursor.toArray(function(err, items){
			res.send(items);
		});


	});
});


module.exports = router;