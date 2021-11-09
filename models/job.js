const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    maxLength: 50,
  },
  position: {
    type: String,
    required: true,
    maxLength: 100,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    value: [
      "pending",
      "interview",
      "denied"
    ]
  },
  createdBy: {
    objectId: mongoose.Types.objectIds,
    required: true
  },
  timeStamp: /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/gm
});

module.exports = mongoose.model("jobs", jobSchema)