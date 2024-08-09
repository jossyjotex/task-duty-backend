const TASKS = require("../model/taskModel");

// POST FUNCTION, C--FOR CREATE IN CRUD OPERATIONS

const createTASKS = async (req, res) => {
  //   console.log(req.body);
  const { title, description, tags } = req.body;
  req.body.createdBy = req.user.userId

  if (!title || !description || !tags) {
    res.status(400).json({ success: false, message: "please fill all fields" });
    return;
  }

  try {
    await TASKS.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "task created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//   READ FUNCTION, R--FOR READ IN CRUD OPERATIONS

const getTASKS = async (req, res) => {
  try {
    const tasks = await TASKS.find({});
    if (tasks.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found" });
    }
    res.status(200).json({ success: "true", message: "all task", tasks });
  } catch (error) {
    res.status(500).json(error);
  }
};

//   UPDATE FUNCTION, U--FOR UPDATE IN CRUD OPERATIONS

const updateTASK = async (req,res) => {
  const { taskId } = req.params;
  const {userId} = req.user;

  try {
    await TASKS.findOneAndUpdate({ _id: taskId, createdBy:userId}, req.body, {
      new: true,
      runvalidators: true,
    }).populate("createdBy");
    res
      .status(200)
      .json({ success: "true", message: "task updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
//   DELETE FUNCTION, D--FOR DELETE IN CRUD OPERATIONS

const deleteTASK = async (req,res)=>{
  const {taskId} = req.params;
  const {userId} = req.user
  try {
    await TASKS.findOneAndDelete({ _id:taskId,createBy:userId });
    res.status(200).json({ success: true, message: "deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
//   SINGLE PARAMS FUNCTION FOR GETTING A SINGLE TASK

const singelTASK = async (req, res) => {
  const { taskId } = req.params;
  const {userId} = req.user;
  try {
    const task = await TASKS.findOne({ _id: taskId,createdBy:userId }).populate("createdBy");
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json(error);
  }
};
// get all tasks by a user

const getAllTasksByUser = async(req,res)=>{
  const {userId} = req.user
  try {
    const task = await TASKS.find({createdBy:userId}).populate("createdBy");
    res.status(200).json({success:true, message:"users task",task})

  } catch (error) {
    res.status(500).json(error)
      
  }
}


module.exports = {
  createTASKS,
  getTASKS,
  updateTASK,
  deleteTASK,
  singelTASK,
  getAllTasksByUser
};
