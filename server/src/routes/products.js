const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/multer');
const Product = require('../models/product');
const userModeling = require('../utils/userModel');

const router = new express.Router();

// Create a product
router.post('/products', auth.enhance, async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
}); 

router.post(
  '/products/photo/:id',
  //auth.enhance,
  upload('products').single('file'),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const { file } = req;
    const productId = req.params.id;
    try {
      if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
      }
      const product = await Product.findById(productId);
      if (!product) return res.sendStatus(404);
      product.image = `${url}/${file.path}`;
      await product.save();
      res.send({ product, file });
    } catch (e) {
      console.log(e);
      res.sendStatus(400).send(e);
    }
  }
);

// Get all movies
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get movie by id
router.get('/products/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findById(_id);
    if (!product) return res.sendStatus(404);
    return res.send(product);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update product by id
router.put('/products/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'image',
    'typo',
    'price',
    'quantity',
    'description',
    'releaseDate',
    'endDate'
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const product = await Product.findById(_id);
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    return !product ? res.sendStatus(404) : res.send(product);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete movie by id
router.delete('/products/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(_id);
    return !product ? res.sendStatus(404) : res.send(product);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// Movies User modeling (Get Movies Suggestions)
router.get('/products/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const cinemasUserModeled = await userModeling.moviesUserModeling(username);
    res.send(cinemasUserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
