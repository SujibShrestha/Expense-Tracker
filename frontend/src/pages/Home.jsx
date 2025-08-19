import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='min-h-full min-w-full bg-gray-100'>
    <Navbar/>
    <div className='flex'>
<Sidebar/>
<Outlet/></div>
    </div>
  )
}

export default Home
