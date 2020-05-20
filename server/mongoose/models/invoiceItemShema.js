let mongoose = require('mongoose')

let invoiceItemsSchema = new mongoose.Schema({
  invoice_id:  mongoose.Schema.Types.ObjectId,
  product_id:  mongoose.Schema.Types.ObjectId,
  quantity: Number
})

module.exports = mongoose.model('InvoiceItem', invoiceItemsSchema)