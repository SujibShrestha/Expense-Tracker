import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false); // Toggle password visibility

  const navigate = useNavigate();

  const handleToggle = () => {
    setShow(!show);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      const res = await fetch("http://localhost/Web2/Expense-Tracker/backend/login.php", {
        method: "POST",
         credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to homepage or dashboard
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <div className="w-[100vw] max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h3 className="text-3xl font-bold font-[Roboto] mb-2">Welcome back!</h3>
          <p className="text-gray-600 font-[Roboto]">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium font-[Roboto]">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium font-[Roboto]">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-600"
                onClick={handleToggle}
              >
                {!show ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            {error && (
              <p className="text-red-500 text-xs pt-3 pl-1.5 font-raleway">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            value="Login"
            className="mt-4 w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
          />
        </form>

        <p className="mt-4 text-center text-gray-500 font-[Roboto]">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
