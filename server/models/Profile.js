const mongoose = require('mongoose');
const Joi = require('joi');

const profileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  medicalHistory: { 
    type: String, 
    required: true 
  },
  fitnessLevel: { 
    type: String, 
    required: true 
  },
  dietaryPreferences: { 
    type: String, 
    required: true 
  },
  wellnessGoals: { 
    type: String, 
    required: true 
  }
});

const Profile = mongoose.model('Profile', profileSchema);

const validateProfile = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().label('User ID'),
    medicalHistory: Joi.string().required().label('Medical History'),
    fitnessLevel: Joi.string().required().label('Fitness Level'),
    dietaryPreferences: Joi.string().required().label('Dietary Preferences'),
    wellnessGoals: Joi.string().required().label('Wellness Goals')
  });
  return schema.validate(data);
};

module.exports = { Profile, validateProfile };
