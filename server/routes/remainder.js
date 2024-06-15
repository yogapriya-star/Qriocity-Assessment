const express = require('express');
const router = express.Router();
const { Remainder, validateRemainder } = require('../models/remainder');
const { User } = require('../models/user');

// Create a new remainder
router.post('/', async (req, res) => {
  
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send('User not found');

  const remainder = new Remainder({
    userId: req.body.userId,
    goalName: req.body.goalName,
    description: req.body.description,
    dateTime: req.body.dateTime
  });

  await remainder.save();
  res.send(remainder);
});

// Fetch all remainders by user ID
router.get('/:userId', async (req, res) => {
  try {
    const remainders = await Remainder.find({ userId: req.params.userId });
    if (!remainders.length) return res.status(404).send('No remainders found');
    res.send(remainders);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete remainder by ID
router.delete('/:id', async (req, res) => {
  try {
    const remainder = await Remainder.findByIdAndDelete(req.params.id);
    if (!remainder) return res.status(404).send('Remainder not found');
    res.send('Remainder deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});






module.exports = router;
