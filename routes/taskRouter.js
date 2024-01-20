const express = require("express");
const router = express.Router();
// const TASKS = require("./model/taskModel");
const {
  createTASKS,
  getTASKS,
  updateTASK,
  deleteTASK,
  singelTASK,
} = require("../controllers/taskControllers");

// post request, c--for create in CRUD operations
router.post("/task/", createTASKS);
// GET REQUEST, R--FOR READ IN CRUD OPERATIONS
router.get("/task/", getTASKS);
// UPDATE REQUEST, U--FOR UPDATE IN CRUD OPERATIONS
router.patch("/task/:taskId", updateTASK);

// DELETE REQUEST, D--FOR DELETE IN CRUD OPERATIONS
router.delete("/task/:taskId", deleteTASK);

// PARAMS FOR SINGLE TASK
router.get("/task/:taskId", singelTASK);

module.exports = router;
