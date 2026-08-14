const productModel = require('../model/product.model')
const storageService = require('../service/service')





async function createProduct(req,res){
    // console.log(req.productPartner)

    // console.log(req.body)

    // console.log(req.file)

    const uploadFileResult = await storageService.uploadFile(req.file.buffer,"Aman")

    // console.log(uploadFileResult)


    const productItem = productModel.create({
        name:req.body.name,
        title:req.body.title,
        category:req.body.category,
        description:req.body.description,
        image:uploadFileResult.url,
        price:req.body.price,
        public_id:req.body.public_id

    })

    


    res.status(201).json({
        message:"created ",
        productItem:productItem
             

        
    })
}



module.exports ={createProduct}