import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../utils/helper";
const Register = () => {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  function handletoggle() {
    setShow(!show);
  }

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setError("Invalid email address");
    return;
  }
  if (!password) {
    setError("Please enter your password");
    return;
  }

  try {
    const res = await fetch("http://localhost/Web2/Expense-Tracker/backend/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullname,
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (data.status === "success") {
      navigate("/"); // redirect after success
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
          <h3 className="text-3xl font-bold font-[Roboto] mb-2">Welcome👋!</h3>
          <p className="text-gray-600 font-[Roboto]">
            Enter your account details
          </p>
        </div>

        <form
         action="register.php"
          method="POST"
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="fullname"
              className="mb-1 font-medium font-[Roboto]"
            >
              Fullname
            </label>
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Enter your name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium font-[Roboto]">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email} // ✅ connect to state
              onChange={(e) => setEmail(e.target.value)} // ✅ update state
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-medium font-[Roboto]"
            >
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="absolute top-3 left-88" onClick={handletoggle}>
                {!show ? <FaRegEyeSlash /> : <FaRegEye />}
              </p>
            </div>
            {error && (
              <p className="text-red-500 text-xs pt-3 pl-1.5 font-raleway">
                {error}
              </p>
            )}
          </div>

          <input
            type="submit"
            value="Register"
            className="mt-4 w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
          />
        </form>

        <p className="mt-4 text-center text-gray-500 font-[Roboto]">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer">
            <Link to="/login">Log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
