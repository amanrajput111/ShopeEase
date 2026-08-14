const productModel = require('../model/product.model')


const getProduct = async (req,res)=>{

    const productItem = await productModel.find()

     res.status(200).json({
        message: "product fetched succesfully",

        products: productItem
  
     })

}

module.exports =  {getProduct}