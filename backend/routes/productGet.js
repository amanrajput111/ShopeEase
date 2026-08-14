const express = require('express')
const getProductController = require('../controller/ProductGet')

const router = express.Router()


router.get('/',getProductController.getProduct)





module.exports = router