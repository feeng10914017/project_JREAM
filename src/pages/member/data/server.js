// var createError = require('http-error')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
var app = express()

var loginRouter = require('./routes/login')
var RegisterRouter = require('./routes/register')
var InformationRouter = require('./routes/information')
var editmemberRouter = require('./routes/editmember')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

//會員
app.use('/login', loginRouter)
app.use('/register', RegisterRouter)
app.use('/information', InformationRouter)
app.use('/editmember', editmemberRouter)

app.listen(5555, () => console.log('API is running on http://localhost:5555'))

module.exports = app
