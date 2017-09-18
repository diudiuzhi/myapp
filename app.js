var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    dbOptions = {
	    host: '10.166.224.163',
	    user: 'root',
	    password: '123456',
	    port: '3344',
        database: 'beef'
};

var index = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');

var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(myConnection(mysql, dbOptions, 'single'));

//app.use(cookieParser());
app.use(session({
	secret: '12345',
	path: '/',
	cookie: {maxAge: 1000 * 60 * 10},
	resave: false,
	saveUninitialized: true,
}));

app.use(function(req, res, next){
	var url = req.originalUrl;
	console.log(url);
	if(url!='/users/login' && !req.session.uid) {
		return res.redirect("/users/login");
	}
	next();
});

app.use('/', index);
app.use('/users', users);
app.use('/tasks', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
