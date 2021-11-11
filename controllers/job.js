const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getOneJob = (req, res) => {
    const {userID} = req.user.userID;
    const {id: jobID} = req.params

    const job = await Job.findOne({ createdBy: userID, _id: jobID })

    if (!job) {
        throw new NotFoundError('not job with id ${jobID}');
    }

    res.status(StatusCodes.OK.json({job}))
};

const getAllJobs = (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort(
    "created at"
  );
  res.status(StatusCodes.OK).json({ jobs, length: jobs.length });
};

const deleteJob = (req, res) => {
  res.send("deleteJob");
};

const createJob = (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED.json({ job }));
};

const updateJob = (req, res) => {
  res.send("updateJob");
};

module.exports = { getOneJob, getAllJobs, deleteJob, createJob, updateJob };
