const booksModel = require('../models/booksModel');
const validator = require("../validator/validator")
const reviewModel = require("../models/reviewModel")


//CREATEBOOK-

let createBook = async function (req, res) {
    try {
        const data = req.body;

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



//GETBOOKSBYQuery-

let getBook = async function (req, res) {

    try {

        const data = req.query
        const book = await booksModel.find(data, { isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).collation({ locale: "en" }).sort({ title: 1 })
        if (book.length === 0) {
            return res.status(404).send({ status: false, message: "No book found according to your search" })
        }
        return res.status(200).send({ status: true, totalBooks: book.length, data: book })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//UPDATE BOOKS:-

const updateBooks = async (req, res) => {
    try {
        let book_Id = req.params.bookId;
        let data = req.body
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: "Pls, provide some data to update." }) }
        let book = await booksModel.findById(book_Id)
        let dataDup = await booksModel.findOne({ title: data.title })
        // if ((book!=dataDup)&&dataDup) return res.status(400).send({ status: false, msg: "title cannot be duplicate" })
        if (dataDup) return res.status(400).send({ status: false, msg: "title cannot be duplicate" })
        let ISBNDup = await booksModel.findOne({ ISBN: data.ISBN })
        if (ISBNDup) return res.status(400).send({ status: false, msg: "ISBN cannot be duplicate" })
        if (!book) { return res.status(400).send({ status: false, msg: "No book find with this id, Check your id." }) }
        if (book.isDeleted == true) { return res.status(400).send({ status: false, msg: "book is already deleted." }) }
        let updatedBooks = await booksModel.findOneAndUpdate({ _id: book_Id },
            { $set: { title: data.title, excerpt: data.excerpt, releasedAt: data.releasedAt, ISBN: data.ISBN } }, { new: true })
        return res.status(201).send({ status: true, updatedBooks: updatedBooks })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message })
    }
}


// get books by id-

const getBooksById = async function (req, res) {

    let bookId = req.params.bookId;

    let books = await booksModel.findOne({ _id: bookId }, { isDeleted: false });
    if (!books) return res.status(404).send({ status: false, message: "No book found according to your search" })
    
    let reviews = await reviewModel.find({ bookId: bookId ,isDeleted: false}).select({ bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
    let bookWithReviews = JSON.parse(JSON.stringify(books));
    bookWithReviews.reviewsData = reviews
    
    return res.status(200).send({ status: true, message: 'Books list',totalReviews:reviews.length, data: bookWithReviews });

}



//DELETEBOOK-

let deleteBook = async function (req, res) {

    try {
        let id = req.params.bookId

        let blogToBeDeleted = await booksModel.findById(id)
        if (blogToBeDeleted.isDeleted == true) { return res.status(400).send({ status: false, msg: "Books has already been deleted" }) }
        if (!blogToBeDeleted) { return res.status(404).send({ status: false, message: "book to be deleted not found" }) }

        let deleted = await booksModel.findOne({ _id: id, isDeleted: true })
        return res.status(200).send({ Status: true, messsage: "Requested book has been deleted.", data: deleted })

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
