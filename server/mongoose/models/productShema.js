let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  name: String,
  price: Number
})

module.exports = mongoose.model('Product', productSchema)