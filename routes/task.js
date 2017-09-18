var express = require('express');
var router = express.Router();

/* GET task page. */
router.get('/list', function(req, res, next) {
	console.log(req.session.uid);
	res.render('index');
});

module.exports = router;