const express = require ('express')
const authController = require('../controller/user.controller')


const router = express.Router()

// user register ------------------------------------
router.post('/register',authController.registerUser)

router.post('/login',authController.loginUser)

router.get('/logout',authController.logout)











module.exports = router