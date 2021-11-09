const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
      pattern:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  });

  module.exports = mongoose.model("user", userSchema)