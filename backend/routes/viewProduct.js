// routes/product.js
const express = require('express')
const viewProductcontroller = require('../controller/Viewproduct')

const router = express.Router()

router.get('/:id', viewProductcontroller.viewProduct)

module.exports = router
