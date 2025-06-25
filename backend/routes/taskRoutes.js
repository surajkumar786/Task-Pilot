const express = require('express');
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData} = require('../controllers/taskController');

const router =express.Router();

//Task management Routes
router.get("/dashboard-data",protect,getDashboardData); // Admin only
router.get("/user-dashboard-data",protect,getUserDashboardData)  ; // User specific tasks
router.get("/",protect,getTasks);                // Get all tasks(admin:all, user: own tasks)
router.get("/:id",protect,getTaskById);          // Get task by ID (admin: all, user: own tasks)
router.post("/",protect,adminOnly,createTask);// Create a new task (Admin only)
router.put("/:id",protect,updateTask);           // Update task details
router.delete("/:id",protect,adminOnly,deleteTask);// Delete a task (Admin only)
router.put("/:id/status",protect,updateTaskStatus);// Update task status (Admin only)
router.put("/:id/todo",protect,updateTaskChecklist);// Update task checklist (Admin only)

module.exports = router;
