const express = require("express");
const connectDB = require("../04-store-API/db/connect");
const errorMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const app = express();
require("dotenv").config();
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
//middleware

const port = process.env.PORT || 1234;
const auth = require("./middleware/authentication")

app
  .use(express.urlencoded({ extended: false }), express.json())

  .use("/api/v1/jobs", auth, jobsRouter)
  .use("/api/v1/auth", authRouter)

  //middleware
  .use(notFound)
  // .use(errorMiddleware);

const startup = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`listening @ ${port}`));
  } catch (err) {
    console.log(err);
  }
};

startup();
