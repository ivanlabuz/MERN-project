let express = require('express');
let router = express.Router();
let ProductShema = require('../mongoose/models/productShema')



router.get('/', async (req, res) => {
  try {
    await ProductShema.find((error, array) => res.status(200).send(array))
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductShema
      .findById(req.params.id, ((error, item) => item))
    if (product) {
      res.status(200).send(product)
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
    req.body.price
  ) {
    const productShema = new ProductShema({
      name: req.body.name,
      price: req.body.price
    })
    try {
      const product = await productShema.save()
      res.status(201).send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  } else {
    res.status(404).send({ "message error": "not all data entered" });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const productRemoval = await ProductShema.findByIdAndRemove(req.params.id)
    if (productRemoval) {
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
    req.body.price
  ) {
    try {
      const productShema = new ProductShema({
        _id: req.params.id,
        name: req.body.name,
        price: req.body.price
      })
      const product = await ProductShema
        .findByIdAndUpdate(req.params.id, productShema, { new: true })
      if (product) {
        res.status(201).send(product)
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

