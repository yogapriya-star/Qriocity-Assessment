const mongoose = require('mongoose');
const Joi = require('joi');

const remainderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  goalName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  dateTime: { 
    type: Date, 
    required: true 
  }
});

const Remainder = mongoose.model('Remainder', remainderSchema);

const validateRemainder = (data) => {
  const schema = Joi.object({
    goalName: Joi.string().required().label('Goal Name'),
    description: Joi.string().required().label('Description'),
    dateTime: Joi.dateTime().required().label('Date Time'),
  });
  return schema.validate(data);
};

module.exports = { Remainder, validateRemainder };
