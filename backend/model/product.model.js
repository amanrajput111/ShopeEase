const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,

    },
    price:{
          
        type:String,
    },
    category:{
        type:String
    },
    public_id:{
        type:String,
    }
})
const productModel = mongoose.model("product" , productSchema)
module.exports = productModel