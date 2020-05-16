let mongoose = require('mongoose')

let invoiceItemsSchema = new mongoose.Schema({
  invoice_id:  { type: mongoose.Schema.Types.ObjectId, ref: "Invoice"},
  product_id:  { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
  quantity: Number
})

module.exports = mongoose.model('InvoiceItem', invoiceItemsSchema)