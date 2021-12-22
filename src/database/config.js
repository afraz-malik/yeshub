const container = require('../../container')
const mongoose = require('mongoose')

const config = require('config')

const DB_CONFIG = () => {
  container.resolve(function () {
    mongoose.Promise = global.Promise
    mongoose
      .connect(
        // `mongodb://${config.get('DB.host')}/${config.get(
        //   'DB.name'
        // )}:${config.get('DB.port')}`,
        // `mongodb://${config.get("DB.host")}/${config.get("DB.name")}`,
        // 'mongodb://127.0.0.1:27017/yesHub',
        'mongodb+srv://root:toor@tltm.ozxq4.mongodb.net/yeshub',
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      )
      .then(() => console.log('connected'))
  })
}

module.exports.dbconfig = DB_CONFIG
