let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  name: String,
  price: mongoose.Decimal128
})

module.exports = mongoose.model('Product', productSchema)