const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });
    
    const passCompare = req.body.password === user.password;
    if (!passCompare)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();

    // Concatenate firstName and lastName
    const fullName = `${user.firstName} ${user.lastName}`;

    res.status(200).send({
      token,
      userId: user._id,
      email: user.email,
      name: fullName,
      message: "Logged in successfully"
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;