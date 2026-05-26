const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user,
  });

  res.json(tasks);
};

const createTask = async (req, res) => {
  const task = await Task.create({
    user: req.user,
    title: req.body.title,
  });

  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.completed = !task.completed;

  const updatedTask = await task.save();

  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task removed",
  });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};