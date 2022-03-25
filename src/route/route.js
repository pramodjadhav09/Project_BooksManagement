const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController");
const { authentication } = require('../middleware/middleware');


router.post("/register",userController.createUser)
router.post("/login",loginController.login)


module.exports = router;
