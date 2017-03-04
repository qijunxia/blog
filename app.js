var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//bodyParser解析post请求
var bodyParser = require('body-parser');
//设置我们的app应用的路由架构
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//用bodyParser解析post请求提交的数据
app.use(bodyParser.json());//解析json数据
//解析普通数据 解析后的数据放在req.body
app.use(bodyParser.urlencoded({ extended: false }));
//获取cookie
app.use(cookieParser());
//设置静态资源路由
app.use(express.static(path.join(__dirname, 'public')));
//路由映射 路由的设置应该遵循Restful设计原则(一切围绕数据)
app.use('/', index);
app.use('/users', users);





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
