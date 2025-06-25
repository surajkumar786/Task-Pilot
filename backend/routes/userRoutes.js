const express = require('express');
const {adminOnly, protect} = require('../middlewares/authMiddleware');
const { getUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

//user management routes
router.get("/",protect,adminOnly,getUsers); // Get all users(admin only)
router.get("/:id",protect,adminOnly,getUserById); // Get user by ID(admin only)



module.exports = router;