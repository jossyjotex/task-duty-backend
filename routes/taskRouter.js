const express = require("express");
const router = express.Router();
// const TASKS = require("./model/taskModel");
const auth = require('../middleware/auth')
const {
  createTASKS,
  getTASKS,
  updateTASK,
  deleteTASK,
  singelTASK,
  getAllTasksByUser,
} = require("../controllers/taskControllers");

// function to check auth

// post request, c--for create in CRUD operations
router.post("/task",auth,createTASKS);
// GET REQUEST, R--FOR READ IN CRUD OPERATIONS
router.get("/task",getTASKS);
// UPDATE REQUEST, U--FOR UPDATE IN CRUD OPERATIONS
router.patch("/task/:taskId",auth,updateTASK);

// DELETE REQUEST, D--FOR DELETE IN CRUD OPERATIONS
router.delete("/task/:taskId",auth,deleteTASK);
router.get("/task/:userId",auth,getAllTasksByUser)

// PARAMS FOR SINGLE TASK
router.get("/singletask/:taskId",auth,singelTASK);


module.exports = router;
