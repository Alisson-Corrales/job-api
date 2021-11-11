const express = require("express");
// const {  } = require("express");
const {getAllJobs, getOneJob, createJob, deleteJob, updateJob} = require('../controllers/job')
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob)
router.route("/:id").get(getOneJob).post(deleteJob).put(updateJob)

module.exports = router