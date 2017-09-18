var express = require('express');
var UUID = require('uuid');
var router = express.Router();

/* GET task page. */
// router.get('/list', function(req, res, next) {
// 	var uid = req.session.uid;
// 	req.getConnection(function(err, conn) {
//         if (err) {
//             return next(err);
//         } else {
//             //conn.query('select * from task where user_id =?', [uid], function(err,result) {
//             conn.query('select * from user', [], function(err,result) {
//                 if (err) {
//                     return next(err);
//                 } else {
// 					res.render('index',{
// 							users: result
// 						});
//                 }
//             });
//         }
//     });
// });

/* Add new task. */
router.post('/add', function(req, res, next){
    var task_id = UUID.v1();
    var user_id = req.session.uid;

    var task_content = req.body.task_content;
    var start_timestamp = req.body.start_timestamp;
    var end_timestamp = req.body.end_timestamp;
    var task_type = req.body.task_type;
    var task_title = "1";

    console.log(task_content);
    console.log(start_timestamp);
    console.log(end_timestamp);
    console.log(task_type);
    console.log(UUID.v1())

    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query('insert into task (task_id, task_type, user_id, task_content,start_timestamp, end_timestamp) values(?,?,?,?,?,?)', [task_id, task_type, user_id, task_content,start_timestamp,end_timestamp], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    res.redirect('/');
                }
            });
        }
    });
    
});

module.exports = router;