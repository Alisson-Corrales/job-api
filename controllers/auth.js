const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, UnauthError } = require("../../05-jwt-basics/errors");
// const bcrypt = require("bcrypt");

//Register
const register = async (req, res) => {
  //hashes are safe
  //hash - passing a string through a formula to get back a completely different string. Hashes are 1 way
  //salting = create a random number of bits and add it to the string before hashing (10 bits 1024X more complex)
  //peppering - addind a extra letter [a-zA-Z] to the end of the password (52 X more complex)

  //   const { password } = req.body;
  //   const salt = await bcrypt.genSalt(10);
  //   const hashpass = bcrypt.hash(password, salt);
  const newUser = await User.create(req.body);
  const token = newUser.createJMT();
  res
    .status(StatusCodes.CREATED)
    .json({ newUser })
    .json({ user: { name: newUser.name, userID: newUser._id }, token });
};

//console.log(User);

//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("must provide an email and password");
  }
  
  const user = await User.findOne({ email });

  //console.log("pog");

  if (!user) {
    throw new UnauthError("Invalid Credentials");
  }

  const isPassCorrect = await User.comparePassword(password);
  if (!isPassCorrect) {
    throw new UnauthError("Invalid Credentials");
  }

  const token = user.createJWT();

  res
    .send(StatusCodes.OK)
    .json({ user: { name: user.name(), userID: user.id }, token });
};

module.exports = { register, login };
