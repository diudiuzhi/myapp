var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/physical', function(req, res, next) {
	var uid = req.session.uid;
	var type = 'physical';

	req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query('select * from task where task_type=?', [type], function(err,result) {
                if (err) {
                    return next(err);
                } else {
					res.render('index_physical',{
							tasks: result
						});
                }
            });
        }
    });

	// res.render('index_physical');
});

module.exports = router;