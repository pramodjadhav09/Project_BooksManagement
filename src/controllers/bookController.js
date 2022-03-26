const bookModel = require('../models/booksModel');


let createBook = async function(req, res){
    let data = req.body;
    
    let savedData = await bookModel.create(data)
    res.status(201).send({status:true, msg:'created book sucssesfully',data:savedData})
    
}





module.exports.createBook =createBook;