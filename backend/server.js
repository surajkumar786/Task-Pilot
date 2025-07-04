require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.get("/",(req,res) => {
  res.json("Hello");
})

//middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.startsWith('Invalid file type')) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

//connect to MongoDB
connectDB();

//Middleware to parse JSON requests
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

//serve upload folder
app.use('/uploads',express.static(path.join(__dirname,"uploads")));

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
