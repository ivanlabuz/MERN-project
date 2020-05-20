let mongoose = require('mongoose')

let invoiceSchema = new mongoose.Schema({
  customer_id: mongoose.Schema.Types.ObjectId,
  discount: Number,
  total: Number,
  invoiceItems: Array
})

module.exports = mongoose.model('Invoice', invoiceSchema)