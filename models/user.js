const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "must provide a valid email",
    ],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "must provide a password"],
    minLength: 6,
  },
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  console.log(this.password);
  next()
});

UserSchema.methods.createJWT = function() {
  return jwt.sign(
    //payload
    {userID: this._id, name: this.name},
    process.env.JTW_SECRET,
    {
      expiresIn: "30d"
    }

  )
}

UserSchema.methods.comparePassword = async function(submittedPass) {
  const isMatch = await bcrypt.compare(submittedPass, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
