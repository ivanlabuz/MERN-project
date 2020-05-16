let mongoose = require('mongoose')

let invoiceSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer"},
  discount: Number,
  total: mongoose.Decimal128,
  invoiceItems: Array
})

module.exports = mongoose.model('Invoice', invoiceSchema)