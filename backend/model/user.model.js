const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        
    },

    email:{
       type:String,
        
    },

    password:{
        type:String
    },

    phone:{
       type:Number
    },

    city:{
       type:String
    },
     role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }



)

const userModel =   mongoose.model('user' , userSchema)

module.exports = userModel