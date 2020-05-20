let mongoose = require('mongoose')

let customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String
})

module.exports = mongoose.model('Customer', customerSchema)