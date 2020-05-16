let express = require('express');
let router = express.Router();
let CustomerShema = require('../mongoose/models/customerShema')



router.get('/', async (req, res) => {
  try {
    await CustomerShema.find((error, array) => res.status(200).send(array))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await CustomerShema
      .findById(req.params.id, ((error, item) => item))
    if (customer) {
      res.status(200).send(customer)
    }
    res.status(404).send({ "message error": "No item found" })
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
    req.body.name &&
    req.body.address &&
    req.body.phone
  ) {
    const customerShema = new CustomerShema({
      name: req.body.name,
      adress: req.body.address,
      phone: req.body.phone
    })
    try {
      const customer = await customerShema.save()
      res.status(201).send(customer)
    } catch (error) {
      res.status(500).send(error)
    }
  } else {
    res.status(404).send({ "message error": "not all data entered" });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const сustomerRemoval = await CustomerShema.
      findByIdAndRemove(req.params.id)
    if (сustomerRemoval) {
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

router.put('/:id', async (req, res) => {
  if (
    req.body.name &&
    req.body.address &&
    req.body.phone
  ) {
    const customerShema = new CustomerShema({
      _id: req.params.id,
      name: req.body.name,
      adress: req.body.address,
      phone: req.body.phone
    })
    try {
      const customer = await CustomerShema
        .findByIdAndUpdate(req.params.id, customerShema, { new: true })
      if (customer) {
        res.status(201).send(customer)
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

