const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/multer');
const Farm = require('../models/farm');
const userModeling = require('../utils/userModel');

const router = new express.Router();

// Create a farmer
router.post('/farms', auth.enhance, async (req, res) => {
  const farm = new Farm(req.body);
  try {
    await farm.save();
    res.status(201).send(farm);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/farms/photo/:id', upload('farms').single('file'), async (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const { file } = req;
  const farmId = req.params.id;
  try {
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    const farm = await Farm.findById(farmId);
    if (!farm) return res.sendStatus(404);
    farm.image = `${url}/${file.path}`;
    await farm.save();
    res.send({ farm, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
});

// Get all farmers
router.get('/farms', async (req, res) => {
  try {
    const farms = await Farm.find({});
    res.send(farms);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get farmer by id
router.get('/farms/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const farm = await Farm.findById(_id);
    if (!farm) return res.sendStatus(404);
    return res.send(farm);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update farm by id
router.patch('/farms/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  
  const allowedUpdates = ['name', 'produce', 'sellableQuantity', 'city', 'phone_no'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const farm = await Farm.findById(_id);
    updates.forEach((update) => (farm[update] = req.body[update]));
    await farm.save();
    if (!farm) return res.sendStatus(404);
    return res.send(farm);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete cinema by id
router.delete('/farms/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const farm = await Farm.findByIdAndDelete(_id);
    if (!farm) return res.sendStatus(404);
    return res.send(farm);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// Farmer User modeling (GET ALL CINEMAS)
router.get('/farms/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const farms = await Farm.find({});
    const farmsUserModeled = await userModeling.farmUserModeling(farms, username);
    res.send(farmsUserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
