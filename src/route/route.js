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
router.get("/books/:bookId", bookController.getBooksById)
router.put("/books/:bookId",bookController.updateBooks)
router.delete("/books/:bookId", bookController.deleteBook)
router.post("/books/:bookId/review", reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReviews)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)
<<<<<<< HEAD
=======

>>>>>>> 61fbb1bcc962087610e7721bf6844efb4c7c915d



module.exports = router;
