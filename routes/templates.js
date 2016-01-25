exports.template = function(req, res){
	var template_name = req.params.name;
	res.render('templates/' + template_name);
};