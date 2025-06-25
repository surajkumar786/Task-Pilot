import React,{createContext,useState,useEffect, Children} from "react";
import axiosInstance from "../utils/axiosinstance";
import {API_PATHS} from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider =({children}) => {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track Loading

  useEffect(() => {
    if(user) return; // If user is already set, skip fetching

    const accessToken = localStorage.getItem("token");
    if(!accessToken) {
      setLoading(false); // Set loading to false if no token
      return;
    }

    const fetchUser =async() => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data); // Set user data from response
      }
      catch(error){
        console.error("user not authenticated", error);
        clearUser();
      }
      finally{
        setLoading(false);
      }
    };

    fetchUser();
  },[]);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token",userData.token); //save token to local storage
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token"); //remove token from local storage
  };

  return (
    <UserContext.Provider value={{user, loading, updateUser, clearUser}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;