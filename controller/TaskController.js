const taskSchema = require("../model/TestSchema.js");

const createTask = async (req, res) => {
  try {
    console.log("Creating");
    const task = new taskSchema(req.body);
    await task.save();
    res.status(201).json({ message: "Task saved successfully", task });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllTask = async (req, res) => {
  try {
    const tasks = await taskSchema.find();
    res.status(200).json({ message: "success", tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskSchema.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "success", task });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatetask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const task = await taskSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "success", task: task });
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskSchema.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "success", task });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  updatetask,
  deleteTask
};
