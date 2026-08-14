const { json } = require('express');
const userModel = require('../model/user.model')
const jwt = require("jsonwebtoken")

const bcrypt = require("bcryptjs")


// user signup --------------------------------------------------------

   async  function registerUser(req,res){

   const { name , email, password ,  phone, city  } = req.body;


    const isAlreadyUser = await  userModel.findOne({
        email,
    })
      
    if(isAlreadyUser){
         return res.status(400).json({
          message:" User already exists "  
        })
    }


    const hashedPassword =  await bcrypt.hash(password , 10)

    const user = await userModel.create({
        name,
        email,
        password:hashedPassword,
        phone,
        city
    })

    //  token generate karna----------------------------

      const token = jwt.sign({
        id:user._id,
      },process.env.JWT_SECRET)


    //   token store in cookie---------------------------

      res.cookie("token" , token)


       res.status(201).json({
        meassage: "User register succesfully",
         user:user,
         token:token

        })

 }



 // user login api----------------------------------------------------------------

 async function  loginUser(req,res) {

  const { email, password } = req.body;


  const user = await userModel.findOne({
    email,
  })

  if(!user){

    return res.status(404).json({
      meassage:"User Not found"
    })
    }

    const isPassword = await bcrypt.compare(password , user.password)

    if(!isPassword){

      return res.status(400).json({
        meassage:"invalid password "
      })
    }

    const token = jwt.sign({
      id:user._id,
    },process.env.JWT_SECRET)

    res.cookie('token',token)



    res.status(200).json({
      meassage:"User login Succesfully ",
      user: user,
      token:token
    })
  
 }


// logout----------------------------------------------------------------------------

async function logout(req,res){
   res.clearCookie('token')
        res.status(200).json({
         alert:"logout succesfully"
        })
}



// Admin Sign up------------------------------------------------------------------------
 


 module.exports = {registerUser,loginUser, logout}