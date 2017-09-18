var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('signin');
});

router.post('/login', function(req, res, next) {
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
                			req.session.uid = result[0].user_id;
                			res.redirect('/');
                		} else {
                			res.redirect('/users/login');
                		}
                	} else {
                		res.redirect('/users/login');
                	}
                }
            });
        }
    });
});

router.get('/logout', function(req, res, next){
    if(req.session.token) {
        req.session.token = '';
    }
    res.redirect('/users/login');
});

module.exports = router;
