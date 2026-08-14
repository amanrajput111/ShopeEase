import React,{useState} from "react";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
   const navigate = useNavigate()
 
    const [email,setEmail] = useState("")
   
    const [password, setPassword] = useState("")
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://shopeease-2.onrender.com/api/users/login",

      
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res)
    
    const user = res.data.user;
    const token = res.data.token

     
     

    // Optional: Store user
    

    if (user.role === "user") {
      navigate("/");
      localStorage.setItem("user", JSON.stringify(user));
       localStorage.setItem("token", token);
    } else if(user.role ==="admin") {
       navigate("/Admin");
    }else{
      alert("Login failed 🥹")
    }

    

    setEmail("");
    setPassword("");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Section (Illustration) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center p-8">
          <div className="text-white text-center">
            {/* Replace with your SVG/Illustration */}
                 <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
              alt="Security Illustration"
              className="w-48 mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold">Secure Login
      
            </h2>
            <p className="mt-2 text-sm">Your shopping experience, protected.</p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome Back 👋
            {/* <a href="/AdminLogin" className="text-indigo-600 font-semibold hover:underline">Admin</a> */}
          </h2>
          <p className="text-gray-600 mb-6">Sign in to continue shopping.</p>

          <form className="space-y-4"  onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address *</label>
              <input
              
             value={email}
             onChange={(e)=>{
                setEmail(e.target.value)
                
             }}

                type="email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input

              
              value={password}
             onChange={(e)=>{
                setPassword(e.target.value)
                
             }}

                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded border-gray-300 focus:ring-indigo-500" />
                Remember Me
              </label>
              <a href="#" className="text-indigo-600 hover:underline">Forgot Password?</a>
            </div>

            {/* Buttons */}
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
              LOGIN
            </button>
            <button type="button" className="w-full border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              CONTINUE WITH GOOGLE
            </button>
          </form>

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 font-semibold hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
