import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { FaRegEye , FaRegEyeSlash} from 'react-icons/fa6'
import { validateEmail } from "../utils/helper";
const Login = () => {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState(null)
const [show,setShow]=useState(false) // For showing password

//For navigating after login
const navigate=useNavigate()

function handletoggle(){
  setShow(!show);
}

// Handle login form submit
const handlelogin = async(e)=>{
  e.preventDefault()

  if(!validateEmail(email)){
    setError("Invalid email address")
    return;
  }
  if(!password){
    setError("Please enter your password")
    return;
  }
  setError("");
}

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <div className="w-[100vw] max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h3 className="text-3xl font-bold font-[Roboto] mb-2">Welcome back!</h3>
          <p className="text-gray-600 font-[Roboto]">Login to your account</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium font-[Roboto]">
              Email
            </label>
            <input 
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium font-[Roboto]">
              Password
            </label>
            <div className="relative">
            <input
              type={show?"text":"password"}
              id="password"

              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
           <p className="absolute top-3 left-88" onClick={handletoggle}>{!show?<FaRegEyeSlash/>:<FaRegEye/>}</p></div>
            {error && <p className="text-red-500 text-xs pt-3 pb-0 pl-1.5 font-raleway">{error}</p>}
          </div>
         

          <input
          onClick={handlelogin}
            type="submit"
            value="Login"
            className="mt-4 w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
          />
        </form>

        <p className="mt-4 text-center text-gray-500 font-[Roboto]">
          Don't have an account? <span className="text-blue-500 cursor-pointer"><Link to="/register">Sign up</Link></span>
        </p>
      </div> 
    </div>
    
  );
};

export default Login;
