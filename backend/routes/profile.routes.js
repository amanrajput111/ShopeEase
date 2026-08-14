const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth");
const getProfile = require('../controller/profile')
 
router.get("/profile", verifyToken, getProfile.getProfile);

module.exports = router;