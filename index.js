const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { dbconfig } = require('./src/database/config')
const { seedAdmin } = require('./src/seeder/adminSeeder.js')
const cors = require('cors')
let app = express()
const port = process.env.PORT || 4000
const path = require('path')
const startSeeder = require('./src/seeder/initSeeder')
//global variables
global.CONSTANTS = require('./Enum/constants')
global.NOTIFICATION = require('./routes/modules/generalModules/notification/notification')
global._ = require('lodash')
// const app = express();
// console.log(process.env);
dbconfig()
var corsOptions = {
  origin: 'http://localhost:3002',
  optionsSuccessStatus: 200, // For legacy browser support
}
// seedAdmin();
startSeeder()
SetUpExpress()
function SetUpExpress() {
  app.use(bodyParser.json())
  app.use(cors(corsOptions))
  configureExpress(app)
  const router = express.Router()
  app.use(router)
  //all routes defined in this file
  //cron job
  require('./routes/modules/cronjob/event/eventNotification')
  require('./startup/routes')(app)
  require('./startup/config')()
  const rootPath = path.resolve('./uploads')
  app.use(express.static(rootPath))
  app.use(express.static('client/build'))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
  app.listen(port, () => {
    console.log('Listening on: ', port)
  })
}

function configureExpress(app) {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve('./views'))
  app.use(bodyParser.json({ limit: '100mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
  app.use(express.static(__dirname + 'uploads'))
  app.use(express.static(__dirname + 'public'))
  app.use(express.static(__dirname + '/icons'))
  //app.use(cookieParser);
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-Type, x-auth-token'
    )

    next()
  })
  console.log('configured app')
}

// module.exports = app;

module.exports = app
