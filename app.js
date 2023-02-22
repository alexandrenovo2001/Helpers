var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const config = require('config');
const port = config.get('server.port');
const host = config.get('server.host');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'/index.html'));
});

const server = app.listen(port, host, (err) => {
  if (err) {
      console.log(err);
      process.exit(1);
  }
  console.log(`Server is running on ${host}:${server.address().port}`);
});

module.exports = app;
