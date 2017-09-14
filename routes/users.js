var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('signin');
});

router.post('/signin', function(req, res, next) {
    username = req.body.username;
    password = req.body.password;

	req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query('select * from user where username =?', [username], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                	if(result.length) {
                		if (password===result[0].password){
                			console.log("success");
                			res.redirect('/');
                		} else {
                			res.redirect('/users');
                		}
                	} else {
                		res.redirect('/users');
                	}
                }
            });
        }
    });
});

module.exports = router;
