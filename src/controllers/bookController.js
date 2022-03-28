const bookModel = require('../models/booksModel');
const validator = require("../validator/validator")
const userModel = require("../models/userModel");
const booksModel = require('../models/booksModel');


let createBook = async function (req, res) {
    try {
        const data = req.body;

    if (!validator.isValid(data.title)) {return res.status(400).send({ status: false, message: "title Is Required" })}
    if (!validator.isValid(data.excerpt)) {return res.status(400).send({ status: false, message: "Excerpt Is Requird" })}
    if (!validator.isValid(data.userId)) {return res.status(400).send({ status: false, message: "User Id required!" })}
    if (!validator.isValid(data.ISBN)) {return res.status(400).send({ status: false, message: "ISBN required" })}
    if (!validator.isValid(data.category)) {return res.status(400).send({ status: false, message: "Category Is Required" })}
    if (!validator.isValid(data.subcategory)) {return res.status(400).send({ status: false, message: "Subcategory Is Required" })}
    // if(typeof data.ISBN != Number || data.ISBN >10 || data.ISBN < 10) return res.status(400).send({status:false, msg:"Enter valid ISBN"}) 
    
    const duplicteTitle = await bookModel.findOne({title:data.title})
    if (duplicteTitle) {return res.status(404).send({ status: false, message: "title already exists, title must be unique" })}
    const duplicateISBN = await bookModel.findOne({ISBN:data.ISBN})
    console.log(duplicateISBN)
    if (duplicateISBN) {return res.status(404).send({ status: false, message: "ISBN already exists, ISBN must be unique" })}

    let savedData = await bookModel.create(data)
    res.status(201).send({status:true, msg:'created book sucssesfully',data:savedData})

}

catch (error) {
    // console.log(error)
    return res.status(500).send({ msg: error.message })
    }
}



//GETBOOKS-


let getBook = async function (req, res){


    try {
   
       const data = req.query
   
       const filter = { isDeleted: false, ...data }
       console.log(filter)
   
       const book = await bookModel.find(filter).select({_id:1, title:1,excerpt:1,userId:1,category:1,releasedAt:1,reviews:1})
       if (book.length === 0) {
         return res.status(404).send({ status: false, ERROR: "No book found according to the query" })
       }
       return res.status(200).send({ status: true, book: book })
     }
   
     catch (err) {
       return res.status(500).send({ ERROR: err.message })
     }
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
        let updatedBooks = await booksModel.findOneAndUpdate({ _id: book_Id },
            { $set: { title: data.title, excerpt: data.excerpt, releasedAt: data.releasedAt, ISBN: data.ISBN } }, { new: true })
        return res.status(201).send({ status: true, updatedBooks: updatedBooks })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message })
    }

}






module.exports.createBook =createBook
module.exports.getBook =getBook
module.exports.updateBooks = updateBooks
