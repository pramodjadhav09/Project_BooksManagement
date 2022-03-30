const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController");
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")


router.post("/register", userController.createUser)
router.post("/login", loginController.login)
router.post("/book", bookController.createBook)
router.get("/books", bookController.getBook)
router.get("/getbooks/:bookId", bookController.getBooksById)
router.put("/books/:bookId", bookController.updateBooks)
router.delete("/books/:bookId", bookController.deleteBook)
router.post("/books/:bookId/review", reviewController.createReview)



module.exports = router;
