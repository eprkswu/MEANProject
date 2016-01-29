var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res, next){
	var template_name = req.params.name;
	res.render('templates/' + template_name);
});

module.exports = router;