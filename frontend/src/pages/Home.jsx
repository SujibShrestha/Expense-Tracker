import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {

  const [fullname,setFullname]=useState("");
   useEffect(() => {
      const fetchDashboard = async () => {
        try {
          const res = await fetch("http://localhost/Web2/Expense-Tracker/backend/dashboard.php", {
            method: "GET",
            credentials: "include", // send PHP session cookie
          });
  
          const data = await res.json();
  
          if (data.status !== "success") {
            navigate("/login"); // redirect if not authorized
          } else {
            
            setFullname(data.fullname);
          }
        } catch (err) {
          console.error("Error fetching dashboard:", err);
        }
      };
  
      fetchDashboard();
    }, []);
    console.log(fullname)
  return (
    <div className='min-h-full min-w-full bg-gray-100'>
    <Navbar/>
    <div className='flex'>
<Sidebar username={fullname}/>
<Outlet/></div>
    </div>
  )
}

export default Home
