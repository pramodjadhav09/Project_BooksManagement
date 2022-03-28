const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController");
const bookController = require("../controllers/bookController")
const { authentication } = require('../middleware/middleware');


router.post("/register", userController.createUser)
router.post("/login", authentication, loginController.login)
router.post("/book", bookController.createBook)
router.get("/books",bookController.getBook)
router.get("/getbooks/:BookId",bookController.getBooksById)

module.exports = router;
