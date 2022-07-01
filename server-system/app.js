var createError = require('http-errors')
var express = require('express')
var path = require('path')
var formidable = require('formidable')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const Busboy = require('busboy')
const fs = require('fs')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var app = express()
// 解决跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))



app.get('/public/images', function (req, res) {
  let { fileId } = req.query
  res.sendFile(path.join(__dirname, `public/images/${fileId}.png`))
  // console.log('Request for ' + req.url + ' received.')
})
// 处理上传文件服务
app.post('/upload', (req, res) => {
  const busboy = new Busboy({ headers: req.headers })
  const fileId = `${1000000 + Math.round(Math.random() * 8999999)}.png`
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.join(__dirname, 'public/images', fileId)
    file.pipe(fs.createWriteStream(saveTo))
  })

  busboy.on('finish', function () {
    res.send({ msg: '文件上传成功', url: `/public/images/${fileId}`, fileId: fileId })
  })

  return req.pipe(busboy)
})
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
