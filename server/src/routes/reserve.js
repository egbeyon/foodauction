const express = require('express');
const auth = require('../middlewares/auth');
const Reserve = require('../models/reserve');
const userModeling = require('../utils/userModel');
//const generateQR = require('../utils/generateQRCode');

const router = new express.Router();

// Create a reserve
router.post('/reserves', auth.simple, async (req, res) => {
  const reserve = new Reserve(req.body);
  try {
    await reserve.save();
    res.status(201).send({ reserve });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all reserves
router.get('/reserves', auth.simple, async (req, res) => {
  try {
    const reserves = await Reserve.find({});
    res.send(reserves);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get reserve by id
router.get('/reserves/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const reserve = await Reserve.findById(_id);
    return !reserve ? res.sendStatus(404) : res.send(reserve);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Get reserve checkin by id
router.get('/reserves/checkin/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const reserve = await Reserve.findById(_id);
    reserve.checkin = true;
    await reserve.save();
    return !reserve ? res.sendStatus(404) : res.send(reserve);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update reserve by id
router.patch('/reserves/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'date',
    'startAt',
    'productPrice',
    'requestedQuantity',
    'total',
    'username',
    'phone',
    'checkin',
  ];
  const isValidOpere = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOpere) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const reserve = await Reserve.findById(_id);
    updates.forEach((update) => (reserve[update] = req.body[update]));
    await reserve.save();
    return !reserve ? res.sendStatus(404) : res.send(reserve);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete reserve by id
router.delete('/reserves/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const reserve = await Reserve.findByIdAndDelete(_id);
    return !reserve ? res.sendStatus(404) : res.send(reserve);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// User modeling get suggested seats
// router.get('/reserves/usermodeling/:username', async (req, res) => {
//   const { username } = req.params;
//   try {
//     const suggestedSeats = await userModeling.reserveSeatsUserModeling(username);
//     res.send(suggestedSeats);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

module.exports = router;
