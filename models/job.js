const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "please provide name"],
      maxLength: 100,
    },
    status: {
      type: String,
      required: [true, "please provide name"],
      default: "pending",
      value: ["pending", "interview", "denied"],
    },
    createdBy: {
      type: mongoose.Types.objectId,
      ref: "user",
      required: [true, "please provide user"],
    },
  },
  //timeStamp: /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/gm
  { timeStamp: true }
);

module.exports = mongoose.model("Job", jobSchema);
