var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express2' });
});
/* MongoDB TEST Source */
router.get('/mongo2', function(req, res, next){
	var start = req.query.start; //시작페이지
	if(start ==null){
		start ="0";
	}
	//}

	var seq = req.query.seq; //현재시퀀스 페이지
	var seq ;
	var id  = req.query.id; //현재시퀀스 페이지
    //if(seq ==null) {
    //
		//seq = "0";
    //}
    //seq = parseInt(start) + 1;
	console.log("1==start==" + start );
	//console.log("2==end==" + end );
	console.log("3==seq==" + seq );


	client.connect('mongodb://54.249.83.123:27017/newDB', function(err, db){
		if(id == null) {
			//var cursor = db.collection('board').find({"seq":{$gt:parseInt(seq)}}).sort({seq:-1}).skip(parseInt(start)).limit(10);

			//var cursor = db.collection('board').find({"seq":{$lte:parseInt(seq)}}).sort({seq:-1}).skip(parseInt(start)).limit(10)
			var cursor = db.collection('board').find().sort({seq:-1}).skip(parseInt(start)).limit(10)


			db.collection('board').count(function (err,count){
				var jkh  = new Array();
				var jkh2  = new Object();
				cursor.toArray(function(err, items){
					jkh2.total_list = count;

					for (i = 0; i < items.length; i++) {
						title = items[i].title;
						content = items[i].content;
						jkh.push(items[i]);
						//console.log(title);
						//console.log(conent);



					}


					//사람, 책 정보를 넣음
					var totalInfo = new Object(jkh2);
					totalInfo.persons = jkh;
					var jsonInfo = JSON.stringify(totalInfo);
					//console.log(jsonInfo);
					res.send(jsonInfo);
				});

			});
		}else{
			var ObjectID = require('mongodb').ObjectID;
			var cursor = db.collection('board').find({_id: new ObjectID('56a757a6281e57e7bfe14eaa')});
			cursor.toArray(function(err, items){
				res.send(items);
			});
		}

	});
});

module.exports = router;