 const productController = require('../controller/product.controller')
  const express = require("express")
 const router = express.Router()
 const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});


router.post('/',     upload.single("image") , productController.createProduct )


module.exports = router