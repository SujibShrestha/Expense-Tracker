import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className="w-full mb-0.5 h-16 shadow-2xs bg-white flex items-center justify-between px-6">
      <h3 className="text-2xl font-bold">Expense Tracker</h3>
      <FaMoon className="text-xl cursor-pointer" />
    </div>
  )
}

export default Navbar

