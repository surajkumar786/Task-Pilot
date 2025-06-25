import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../components/Cards/UserCard';
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast installed

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0) {
                setAllUsers(response.data);
            } else {
                setAllUsers([]); // Ensure allUsers is an empty array if no data
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            // Optionally, add a toast here for user feedback
            toast.error("Failed to fetch users.");
        }
    };

    // download user report
    const handleDownloadReport = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
                responseType: "blob", // Important for downloading files
            });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a"); // Create a temporary anchor element
            link.href = url;
            link.setAttribute("download", "user_details.xlsx"); // Set desired filename
            document.body.appendChild(link); // Append link to body (required for Firefox)
            link.click(); // Programmatically click the link to trigger download
            link.parentNode.removeChild(link); // Clean up the temporary link
            window.URL.revokeObjectURL(url); // Release the object URL

            toast.success("User report downloaded successfully!"); // Success message
        } catch (error) {
            console.error("Error downloading user report:", error); // Corrected console message
            toast.error("Failed to download user report. Please try again later."); // Corrected toast message
        }
    };

    useEffect(() => {
        getAllUsers();
        return () => {}; // Cleanup function, if any
    }, []);

    return (
        <DashboardLayout activeMenu="Team Members">
            <div className='mt-5 mb-10'>
                <div className='flex md:flex-row md:items-center justify-between'>
                    <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>

                    <button className='flex md:flex download-btn' onClick={handleDownloadReport}>
                        <LuFileSpreadsheet className='text-lg' />
                        Download Report
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                    {allUsers?.map((user) => (
                        <UserCard key={user._id} userInfo={user} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ManageUsers;