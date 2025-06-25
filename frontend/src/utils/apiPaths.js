export const BASE_URL = "http://localhost:8000";

//utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", //register a new user (Admin or Member)
    LOGIN: "/api/auth/login", // Authenticate a user and return a JWT token
    GET_PROFILE: "/api/auth/profile", //get logged-in user details
  },

  USERS: {
    GET_ALL_USERS: "/api/users", //get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //get user by ID
    CREATE_USER: "/api/users", //create a new user(Admin only)
    UPDATE_USER: (userId) => `/api/users/${userId}`, //update user details
    DELETE_USER: (userId) => `/api/users/${userId}`, //delete a user by ID
  },

  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", //get dashboard data
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", // get user dashboard data
    GET_ALL_TASKS: "/api/tasks", //get all tasks(admin:all, user:only assigned tasks)
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, //get tasks by id
    CREATE_TASK: "/api/tasks", // create a new task (admin only)
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, //update task details
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, //delete a task admin only

    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, //update task status (admin or user)
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,
  },

  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks", //download all tasks as an excel file (admin only)
    EXPORT_USERS: "/api/reports/export/users", //download user task report
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", //upload an image file
  },
};
