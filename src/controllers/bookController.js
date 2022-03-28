const bookModel = require('../models/booksModel');
const validator = require("../validator/validator")
const userModel = require("../models/userModel");
const booksModel = require('../models/booksModel');


let createBook = async function (req, res) {
    try {
        const data = req.body;
        // const { title, excerpt, userId, ISBN, category, subcategory, reviews } = req.body

        if (!validator.isValid(data.title)) {
            return res.status(400).send({ status: false, message: "title Is Required" })
        }

        if (!validator.isValid(data.excerpt)) {
            return res.status(400).send({ status: false, message: "Excerpt Is Requird" })
        }

        if (!validator.isValid(data.userId)) {
            return res.status(400).send({ status: false, message: "User Id required!" })
        }


        const ifUserExist = await userModel.findOne({ userId: data.userId })
        // if (!ifUserExist) {
        //     return res.status(404).send({ status: false, message: "User Not Found, Please Check User Id" })
        // }

        if (!validator.isValid(data.ISBN)) {
            return res.status(400).send({ status: false, message: "Invalid ISBN Enterd" })
        }

        if (!validator.isValid(data.category)) {
            return res.status(400).send({ status: false, message: "Category Is Required" })
        }

        if (!validator.isValid(data.subcategory)) {
            return res.status(400).send({ status: false, message: "Subcategory Is Required" })
        }


        let savedData = await bookModel.create(data)
        res.status(201).send({ status: true, msg: 'created book sucssesfully', data: savedData })

    }

    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }

}



//GETBOOKS-


const getBooks = async function (req, res) {
    data = await bookModel.find({ isDeleted: false }).select({
        _id: 1, title: 1, excerpt: 1,
        userId: 1, category: 1, releasedAt: 1, reviews: 1
    })

    res.status(200).send({ status: true, data: data })
}



//UPDATE BOOKS:-


const updateBooks = async (req, res) => {
    try {
        let book_Id = req.params.bookId;
        if (!book_Id) { return res.status(400).send({ status: false, Msg: "Pls,provide a bookId in params." }) }

        let book = await booksModel.findById(book_Id)
        if (!book) { return res.status(400).send({ status: false, msg: "No book find with this id, Check your id." }) }

        if (book.isDeleted == true) { return res.status(400).send({ status: false, msg: "book is already deleted." }) }

        let data = req.body

        if(Object.keys(data)==0){return res.status(400).send({status:false,msg:"Pls, provide some data to update."})}

        let updatedBooks = await booksModel.findOneAndUpdate({ _id: book_Id },
            { $set: { title: data.title, excerpt: data.excerpt, releasedAt: data.releasedAt, ISBN: data.ISBN} }, { new: true })
        return res.status(201).send({ status: true, updatedBooks: updatedBooks })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message })
    }

}




module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.updateBooks = updateBooks