import React from "react";

import userIcon from "../assets/user-line.svg";
import logout from "../assets/logout-box-line.svg";
import dashboard from "../assets/dashboard-line.svg";
import wallet from "../assets/wallet-line.svg";
import { Link,  } from "react-router-dom"

const Sidebar = () => {

  

  return (
    <div className="min-h-screen fixed w-64 bg-white shadow-lg flex flex-col">
      {/* Profile Section */}
      <div className="h-40 flex flex-col justify-center items-center border-b">
        <img
          className="rounded-full h-16 w-16 border-2"
          src={userIcon}
          alt="User"
        />
        <p className="mt-3 font-semibold text-sm">username</p>
      </div>

      {/* Navigation */}
      <ul className="p-4 space-y-2 flex-1">
       <Link to={"/"}> <li className="flex items-center gap-2  hover:bg-purple-700 hover:text-white p-2 rounded cursor-pointer">
          <img src={dashboard} className="h-5 w-5" alt="" /> Dashboard
        </li></Link>
      <Link to={"/expense"}>  <li className="flex items-center gap-2 hover:bg-purple-700 hover:text-white p-2 rounded cursor-pointer">
          <img src={wallet} className="h-5 w-5" alt="" />
          Expenses
        </li></Link>
       <Link to={"/login"}><li  className=" flex items-center gap-2 hover:bg-purple-700 hover:text-white p-2 rounded cursor-pointer"> 
          <img src={logout} className="h-5 w-5" alt="" />
          Logout
        </li></Link>
      </ul>
    </div>
  );
};

export default Sidebar;
