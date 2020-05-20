let mongoose = require('mongoose');

const server = '127.0.0.1:27017'; 
const database = 'react-volt';      

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
      .then(() => {
        console.log(`Database connection successful ${server} ${database}`)
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}

module.exports = Database