const bookModel = require('../models/booksModel');
const validator = require("../validator/validator")
const userModel = require("../models/userModel");
// const booksModel = require('../models/booksModel');
// const mongoose = require('mongoose')

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



//GETBOOKS-


const getBooks= async function (req, res){
    data= await bookModel.find({isDeleted:false}).select({_id:1, title:1,excerpt:1,
        userId:1,category:1,releasedAt:1,reviews:1})

    res.status(200).send({status:true, data:data})
}


/// get books by id
const getBooksById=async function(req,res){
    try{
data=req.params.BookId
if(Object.keys(data).length==0){
    return res.status(400).send({status:false,msg:"book id req"})
}
// id=_id.BookId
let findbook= await bookModel.findOne({BookId:data.BookId})
if(!findbook){
    return res.status(404).send({status:true,msg:"book not found"})
}
// return res.status(200).send({status:true,data:findbook})
let findreviews = await bookModel.find({BookId:data.BookId,isDeleted:false}).select({title:1,email:1,mobile:1})
if(findreviews.length ==0){
    data.reviews = "no reviews found"
    return res.status(200).send({status:false,msg:data})
}
data.reviews = findreviews
return res.status(200).send({status:true,data:findbook})}
catch(error) {
    console.log(error)
    return res.status(500).send({ msg: error.message })
}
}

module.exports.getBooksById=getBooksById

module.exports.getBooks=getBooks
module.exports.createBook =createBook