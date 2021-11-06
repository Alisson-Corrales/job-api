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
  },
  createdBy: {
      //
  },
  timeStamp: {
      createdAt: true,
  },
});
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
