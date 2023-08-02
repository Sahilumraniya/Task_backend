const express = require("express");
const router = express.Router();
const taskController = require("../controller/TaskController");

router.post("/createTask", taskController.createTask);
router.get("/getTask", taskController.getAllTask);
router.get("/getTaskById/:id", taskController.getTaskById);
router.patch("/updateTask/:id", taskController.updatetask);
router.delete("/deleteTask/:id", taskController.deleteTask);

module.exports = router;
