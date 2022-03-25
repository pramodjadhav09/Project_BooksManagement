const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController")


router.post("/register",userController.createUser)
router.post("/login",loginController.login)


module.exports = router;
