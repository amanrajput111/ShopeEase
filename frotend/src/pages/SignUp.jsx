import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';





const SignupPage = () => {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState("")


    const handlesign =  async(e) =>{
        e.preventDefault()

        console.log(name,email,phone,password)
        try{

    
    const log = await axios.post('https://shopeease-2.onrender.com/api/users/register',{
         name,
         city,
         phone,
         password,
         email 
    },
        {
            withCredentials: true
        })

        console.log(log.data);

        const user = log.data

        const token = log.data.token

        navigate("/")

        localStorage.setItem("user", JSON.stringify(user));
       localStorage.setItem("token", token);

    }catch(err){
         console.error("Signup error:", err.response?.data || err.message);
    alert(err.response?.data?.error || "Signup failed");
    }



  setCity('')
  setEmail('')
  setPassword('')
  setName('')
  setPhone('')

     
      
    }




    


    




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Section (Illustration) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-8">
   
      
           
          <div className="text-center">
           <div className="mb-40"> <h1 className="text-5xl font-bold text-shadow-lg text-shadow-fuchsia-950">Welcome ShopEase</h1></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
              alt="Security Illustration"
              className="w-48 mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-blue-600">
              Secure & Easy Shopping
            </h2>
            <p className="text-gray-600 mt-2">
              Your privacy and data protection are our priority.
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">

           Create Your Account 🚀
          
          </h2>
          

          <form className="space-y-4"   onSubmit={handlesign}>
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">Full Name</label>
              <input

              value={name}
              onChange={(e)=>{
                setName(e.target.value)

              }}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">Email Address</label>
              <input

                value={email}
              onChange={(e)=>{
                setEmail(e.target.value)

              }}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-1 font-semibold ">Phone Number</label>
              <input
                value={phone}
              onChange={(e)=>{
                setPhone(e.target.value)

              }}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                value={password}
              onChange={(e)=>{
                setPassword(e.target.value)

              }}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

             {/* Confirm Password  */}
            <div>
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
              value={city}
              onChange={(e)=>{
                setCity(e.target.value)
              }}
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-600 text-sm">
                I agree to the Terms & Conditions *
              </label>
            </div>

            {/* Buttons */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              CREATE ACCOUNT
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              CONTINUE WITH GOOGLE
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
