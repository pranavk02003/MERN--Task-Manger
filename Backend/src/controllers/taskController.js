import Task from "../models/Task.js";

/* GET TASKS  */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*  CREATE TASK  */
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      user: req.user,
      title,
      description
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*  UPDATE TASK  */
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.completed = req.body.completed ?? task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*  DELETE TASK  */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};