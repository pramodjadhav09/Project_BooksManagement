const bookModel = require('../models/booksModel');
const validator = require("../validator/validator")
const userModel = require("../models/userModel")


let createBook = async function(req, res){
    try{
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


    const ifUserExist = await userModel.findOne({userId:data.userId})
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
    res.status(201).send({status:true, msg:'created book sucssesfully',data:savedData})

}

catch (error) {
    console.log(error)
    return res.status(500).send({ msg: error.message })
}

}





module.exports.createBook =createBook