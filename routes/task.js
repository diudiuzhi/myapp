var express = require('express');
var router = express.Router();

/* GET task page. */
router.get('/list', function(req, res, next) {

	var uid = req.session.uid;

	req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        } else {
            //conn.query('select * from task where user_id =?', [uid], function(err,result) {
            conn.query('select * from user', [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                	// if(result.length) {
                	console.log(result.length);
					res.render('index',{
							users: result
						});
                	// }
                }
            });
        }
    });
	// res.render('index',{
	// 	message: 'user'
	// });
});

module.exports = router;