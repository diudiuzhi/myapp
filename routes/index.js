var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/ivy');
});

router.get('/ivy', function(req, res, next) {
    var uid = 'f4cb0ff0-9c1e-11e7-a4ab-1da4a02e1946';
    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query('select * from task where user_id=?', [uid], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    res.render('index',{
                            tasks: result
                        });
                }
            });
        }
    });
});

router.get('/oswald', function(req, res, next) {
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
					res.render('index_oswald',{
							tasks: result
						});
                }
            });
        }
    });
});

module.exports = router;