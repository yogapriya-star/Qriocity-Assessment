const express = require('express');
const router = express.Router();
const { Profile, validateProfile } = require('../models/Profile');
const { User } = require('../models/user');

// Create a new profile
router.post('/', async (req, res) => {
  const { error } = validateProfile(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send('User not found');

  const profile = new Profile({
    userId: req.body.userId,
    medicalHistory: req.body.medicalHistory,
    fitnessLevel: req.body.fitnessLevel,
    dietaryPreferences: req.body.dietaryPreferences,
    wellnessGoals: req.body.wellnessGoals
  });

  await profile.save();
  res.send(profile);
});

// Fetch profile by user ID
router.get('/:userId', async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.userId });
  if (!profile) return res.status(404).send('Profile not found');
  res.send(profile);
});

// Update an existing profile
// Example of handling userId as an ObjectId in route
router.put('/:userId', async (req, res) => {
 
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).send('User not found');

  const profile = await Profile.findOneAndUpdate(
    { userId: req.params.userId },
    {
      medicalHistory: req.body.medicalHistory,
      fitnessLevel: req.body.fitnessLevel,
      dietaryPreferences: req.body.dietaryPreferences,
      wellnessGoals: req.body.wellnessGoals
    },
    { new: true, runValidators: true }
  );

  if (!profile) return res.status(404).send('Profile not found');
  res.send(profile);
});


module.exports = router;
