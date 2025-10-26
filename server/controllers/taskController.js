import TaskModel from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
};

export const addTask = async (req, res) => {
  try {
    const { taskName, subject, estimatedTime, priority } = req.body;
    const savedTask = await TaskModel.create({
      userId: req.user.id,
      taskName,
      subject,
      estimatedTime,
      priority,
    });
    // const newTask = await TaskModel
    //const savedTask = await addTask.save();
    res.status(201).json({
      message: "User Created Successfully",
      success: true,
      data: savedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error ${err.message}`,
      success: false,
      err,
    });
  }
};

export const updateTask = async (req, res) => {
  const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await TaskModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
};
