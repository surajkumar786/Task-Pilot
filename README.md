# Task Pilot

**Task Pilot** is a MERN stack-based task management platform designed for efficient task assignment, tracking, and progress visualization.  
It features role-based access control (**Admin/Manager/Group Leader** & **User**) and allows for real-time tracking of task statuses with visual insights through charts.

---

## 🚀 Features

### 🔹 For Admin / Manager / Group Leader
- Create and assign tasks with:
  - **Due date**
  - **Priority level**
  - **Assigned users** based on skillset
- Add subtasks for each task.
- Update or delete tasks.
- Track task completion status via charts.
- Import tasks and assigners from Excel files.

### 🔹 For Users
- View all assigned tasks in their personal dashboard.
- See task details including due date, priority level, and subtasks.
- Task status updates automatically:
  - **Completed** → All subtasks completed.
  - **In Progress** → One or more subtasks completed.
  - **Pending** → No subtasks completed.

---

## 📊 Data Visualization
- **Bar Chart** → Shows task status distribution (Completed, Pending, In Progress).
- **Pie Chart** → Highlights proportion of tasks in each status.
- **Excel Import** → Extract tasks and assigners directly from an uploaded Excel file.

---

## 🛠 Tech Stack

### **Frontend**
- **React.js**
- **useContext** for state management
- **Chart.js** for data visualization
- **Tailwind CSS** for styling

### **Backend**
- **Node.js** with **Express.js**
- **MongoDB** as the database
- **Multer** or equivalent for file uploads (Excel)
- **xlsx** package for Excel file parsing

---

