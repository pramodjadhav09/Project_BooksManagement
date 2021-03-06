const booksModel = require('../models/booksModel');
const validator = require("../validator/validator")
const reviewModel = require("../models/reviewModel")
const awsS3 = require("../controllers/awsS3")

//CREATEBOOK---------

const createBook = async function (req, res) {
    try {
        const data = req.body;

        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide book details" })
        }

        if (!validator.isValid(data.title)) { return res.status(400).send({ status: false, message: "title Is Required" }) }
        if (!validator.isValid(data.excerpt)) { return res.status(400).send({ status: false, message: "Excerpt Is Requird" }) }
        if (!validator.isValid(data.userId)) { return res.status(400).send({ status: false, message: "User Id required!" }) }
        if (!validator.isValid(data.ISBN)) { return res.status(400).send({ status: false, message: "ISBN required" }) }
        if (!validator.isValid(data.category)) { return res.status(400).send({ status: false, message: "Category Is Required" }) }
        if (!validator.isValid(data.subcategory)) { return res.status(400).send({ status: false, message: "Subcategory Is Required" }) }


        const duplicteTitle = await booksModel.findOne({ title: data.title })
        if (duplicteTitle) { return res.status(404).send({ status: false, message: "title already exists, title must be unique" }) }
        const duplicateISBN = await booksModel.findOne({ ISBN: data.ISBN })
        if (duplicateISBN) { return res.status(404).send({ status: false, message: "ISBN already exists, ISBN must be unique" }) }

        let savedData = await booksModel.create(data)
        res.status(201).send({ status: true, msg: 'created book sucssesfully', data: savedData })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}



//GETBOOKSBYQUERY--------

let getBook = async function (req, res) {
    try {

        const data = req.query
        const book = await booksModel.find(data, { isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).collation({ locale: "en" }).sort({ title: 1 })
        if (book.length === 0) {
            return res.status(404).send({ status: false, message: "No book found according to your search" })
        }
        return res.status(200).send({ status: true, totalBooks: book.length, data: book })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//UPDATEBOOK--------

const updateBooks = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        let data = req.body
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide data to update" })
        }

        let book = await booksModel.findById(bookId)
        if (!book) { return res.status(400).send({ status: false, msg: "No book find with this id, Check your id." }) }

        let dataDup = await booksModel.findOne({ title: data.title })
        if (dataDup) { return res.status(400).send({ status: false, msg: "title cannot be duplicate" }) }

        let ISBNDup = await booksModel.findOne({ ISBN: data.ISBN })
        if (ISBNDup) { return res.status(400).send({ status: false, msg: "ISBN cannot be duplicate" }) }

        if (book.isDeleted == true) { return res.status(400).send({ status: false, msg: "book is already deleted." }) }

        let updatedBooks = await booksModel.findOneAndUpdate({ _id: bookId },
            { $set: { title: data.title, excerpt: data.excerpt, releasedAt: data.releasedAt, ISBN: data.ISBN } }, { new: true })
        return res.status(201).send({ status: true, updatedBooks: updatedBooks })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


//GETBOOKWITHREVIEWBYID----------

const getBooksById = async function (req, res) {
    try {
        let bookId = req.params.bookId;

        let books = await booksModel.findOne({ _id: bookId, isDeleted: false });
        if (!books) return res.status(404).send({ status: false, message: "No book found according to your search" })

        let reviews = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
        let bookWithReviews = JSON.parse(JSON.stringify(books));
        bookWithReviews.reviewsData = reviews

        return res.status(200).send({ status: true, message: 'Books list', totalReviews: reviews.length, data: bookWithReviews });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}



//DELETEBOOK--------

let deleteBook = async function (req, res) {
    try {
        let bookId = req.params.bookId

        let book = await booksModel.findById(bookId)
        if (!book) { return res.status(404).send({ status: false, message: "Which book you want to delete is not found" }) }
        if (book.isDeleted == true) { return res.status(400).send({ status: false, msg: "Books has already been deleted" }) }

        let deletedBooks = await booksModel.findOneAndUpdate({ _id: bookId },
            { $set: { isDeleted: true } }, { new: true })
        return res.status(201).send({ status: true, msg: "Book Deleted Successfully" })
    }
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}



module.exports = {
    getBooksById,
    createBook,
    getBook,
    updateBooks,
    deleteBook
}
