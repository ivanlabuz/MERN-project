let express = require('express');
let router = express.Router();
let InvoicesShema = require('../mongoose/models/invoiceShema')
let InvoiceItemsShema = require('../mongoose/models/invoiceItemShema')

router.get('/', async (req, res) => {
  try {
    await InvoicesShema.find(
      (error, array) => res.status(200).send(array))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get('/:invoice_id/items', async (req, res) => {
  try {
    if (await InvoicesShema
      .findById(req.params.invoice_id)) {
      await InvoiceItemsShema
        .find(
          { invoice_id: req.params.invoice_id },
          (error, array) => res.status(200).send(array)
        )
    } else {
      res.status(404).send({ "message error": "No item found" })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ "message error": "No item found" })
    } else {
      res.status(500).send(error)
    }
  }
})

router.get('/:id', async (req, res) => {
  try {
    const invoice = await InvoicesShema
      .findById(req.params.id, ((error, item) => item))
    if (invoice) {
      res.status(200).send(invoice)
    } else {
      res.status(404).send({ "message error": "No item found" })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ "message error": "No item found" })
    } else {
      res.status(500).send(error)
    }
  }
})

router.get('/:invoice_id/items/:id', async (req, res) => {
  try {
    if (await InvoicesShema
      .findById(req.params.invoice_id)
    ) {
      const invoiceItem = await InvoiceItemsShema
        .findById(req.params.id)
      if (invoiceItem) {
        res.status(200).send(invoiceItem)
      } else {
        res.status(404).send({ "message error": "No item found" })
      }
    } else {
      res.status(404).send({ "message error": "No item found" })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ "message error": "No item found" })
    } else {
      res.status(500).send(error)
    }
  }
})

router.post('/', async (req, res) => {
  if (
    req.body.customer_id &&
    req.body.discount &&
    req.body.total
  ) {
    const invoiceShema = new InvoicesShema({
      customer_id: req.body.customer_id,
      discount: req.body.discount,
      total: req.body.total,
      invoiceItems: []
    })
    try {
      const invoice = await invoiceShema.save()
      res.status(201).send(invoice)
    } catch (error) {
      res.status(500).send(error)
    }
  } else {
    res.status(404).send({ "message error": "not all data entered" });
  }
})

router.post('/:invoice_id/items', async (req, res) => {
  if (
    req.body.product_id &&
    req.body.quantity
  ) {
    try {
      if (await InvoicesShema
        .findById({ _id: req.params.invoice_id })
      ) {
        const invoiceItemShema = new InvoiceItemsShema({
          invoice_id: req.params.invoice_id,
          product_id: req.body.product_id,
          quantity: req.body.quantity
        })
        const invoiceItem = await invoiceItemShema.save()
        await InvoicesShema
          .findByIdAndUpdate(
            req.params.invoice_id, { $push: { invoiceItems: invoiceItem._id } }
          )
        res.status(201).send(invoiceItem)
      } else {
        res.status(404).send({ "message error": "No item found" })
      }
    } catch (error) {
      if (error.name === 'CastError') {
        res.status(404).send({ "message error": "No item found" })
      } else {
        res.status(500).send(error)
      }
    }
  } else {
    res.status(404).send({ "message error": "not all data entered" });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const invoiceRemoval = await InvoicesShema.findByIdAndRemove(req.params.id)
    if (invoiceRemoval) {
      res.status(204).send()
    } else {
      res.status(404).send({ "message error": "No item found" })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ "message error": "No item found" })
    } else {
      res.status(500).send(error)
    }
  }
})

router.delete('/:invoice_id/items/:id', async (req, res) => {
  try {
    if (await InvoicesShema
      .findById({ _id: req.params.invoice_id })
    ) {
      const invoiceItemRemoval = await InvoiceItemsShema
        .findByIdAndRemove(req.params.id)
      if (invoiceItemRemoval) {
        await InvoicesShema.findByIdAndUpdate(
          invoiceItemRemoval.invoice_id, {
          $pull: {
            invoiceItems: invoiceItemRemoval._id
          }
        }
        )
        res.status(204).send()
      } else {
        res.status(404).send({ "message error": "No item found" })
      }
    } else {
      res.status(404).send({ "message error": "No item found" })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ "message error": "No item found" })
    } else {
      res.status(500).send(error)
    }
  }
})

router.put('/:id', async (req, res) => {
  if (
    req.body.customer_id &&
    req.body.discount &&
    req.body.total
  ) {
    try {
      const invoicesShema = {
        customer_id: req.body.customer_id,
        discount: req.body.discount,
        total: req.body.total
      }
      const invoice = await InvoicesShema
        .findByIdAndUpdate(req.params.id, invoicesShema, { new: true })
      if (invoice) {
        res.status(201).send(invoice)
      } else {
        res.status(404).send({ "message error": "No item found" })
      }
    } catch (error) {
      if (error.name === 'CastError') {
        res.status(404).send({ "message error": "No item found" })
      } else {
        res.status(500).send(error)
      }
    }
  } else {
    res.status(400).send({ "message error": "not all data entered" })
  }
})

router.put('/:invoice_id/items/:id', async (req, res) => {
  if (
    req.body.product_id &&
    req.body.quantity
  ) {
    try {
      if (await InvoicesShema
        .findById(req.params.invoice_id)
      ) {
        const invoiceItemsShema = {
          product_id: req.body.product_id,
          quantity: req.body.quantity
        }
        const invoiceItem = await InvoiceItemsShema
          .findByIdAndUpdate(req.params.id, invoiceItemsShema, { new: true })
        if (invoiceItem) {
          res.status(201).send(invoiceItem)
        } else {
          res.status(404).send({ "message error": "No item found" })
        }
      } else {
        res.status(404).send({ "message error": "No item found" })
      }
    } catch (error) {
      if (error.name === 'CastError') {
        res.status(404).send({ "message error": "No item found" })
      } else {
        res.status(500).send(error)
      }
    }
  } else {
    res.status(400).send({ "message error": "not all data entered" })
  }
})

module.exports = router;

