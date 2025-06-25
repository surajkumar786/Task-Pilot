const express = require("express");
const { exportTasksReport, exportUsersReport } = require("../controllers/reportController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/export/tasks", protect,adminOnly,exportTasksReport);     //export all tasks as Excel/Pdf
router.get("/export/users" , protect, adminOnly, exportUsersReport); //Export user-task report

module.exports=router;