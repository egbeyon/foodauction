const express = require('express');
const auth = require('../middlewares/auth');
const Hotbuy = require('../models/hotbuy');

const router = new express.Router();

// Create a showtime
router.post('/hotbuys', auth.enhance, async (req, res) => {
  const hotbuy = new Hotbuy(req.body);
  try {
    await hotbuy.save();
    res.status(201).send(hotbuy);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all hotbuy
router.get('/hotbuys', async (req, res) => {
  try {
    const hotbuy = await Hotbuy.find({});
    res.send(hotbuy);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get hotbuy by id
router.get('/hotbuys/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const hotbuy = await Hotbuy.findById(_id);
    return !hotbuy ? res.sendStatus(404) : res.send(hotbuy);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update hotbuy by id
router.patch('/hotbuys/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['startAt', 'startDate', 'endDate', 'productId', 'farmId', 'quantity', 'metric'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const hotbuy = await Hotbuy.findById(_id);
    updates.forEach((update) => (hotbuy[update] = req.body[update]));
    await hotbuy.save();
    return !hotbuy ? res.sendStatus(404) : res.send(hotbuy);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete showtime by id
router.delete('/hotbuys/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const hotbuy = await Hotbuy.findByIdAndDelete(_id);
    return !hotbuy ? res.sendStatus(404) : res.send(hotbuy);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;
