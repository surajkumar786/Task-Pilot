import React, { useContext } from 'react'
import {BrowserRouter as Router,
        Routes,
        Route,
        Outlet,
        Navigate,
} from "react-router-dom";

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';


import Dashboard from './pages/Admin/Dashboard';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';


import UserDashboard from './pages/User/UserDashboard';
import Mytasks from './pages/User/Mytasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';


import PrivateRoute from './routes/PrivateRoute';
import UserProvider,{UserContext} from './context/userContext';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/tasks' element={<ManageTasks/>}/>
          <Route path='/admin/create-task' element={<CreateTask/>}/>
          <Route path='/admin/users' element={<ManageUsers/>}/>
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["member"]}/>}>
          <Route path='/user/dashboard' element={<UserDashboard/>}/>U
          <Route path='/user/tasks' element={<Mytasks/>}/>
          <Route path='/user/task-details/:id' element={<ViewTaskDetails/>}/>
          </Route>
          
          {/* default route*/}
          <Route path='/' element={<Root/>}/>
        </Routes>
      </Router>
    </div>
    
    <Toaster 
      toastOptions={{
        className:"",
        style:{
          fontsize:"13px",
        },
      }}
      />

    </UserProvider>
  )
}

export default App;

const Root =()=>{
  const {user,loading} = useContext(UserContext);

  if(loading) return <Outlet/>; // Show loading state while user data is being fetched

  if(!user) return <Navigate to="/login"/>; // Redirect to login if user is not authenticated

  return user.role === "admin" ? 
    <Navigate to="/admin/dashboard"/> : 
    <Navigate to="/user/dashboard"/>;
}