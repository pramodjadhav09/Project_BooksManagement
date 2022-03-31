const jwt = require("jsonwebtoken");
const booksModel = require("../models/booksModel");

const authentication = async function (req, res, next) {
    try {
        // Checking for header :
        let token = req.headers["for-check"];
        if (!token) return res.status(400).send({ status: false, msg: "login is required" })

        // Checking the token :
        let decodedtoken = jwt.verify(token, "Group-19")
        if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
        req.decodedtoken = decodedtoken
        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

let authorization = async function (req, res, next) {

    let token = req.headers["for-check"];
    let decodedtoken = jwt.verify(token, "Group-19")

    let bookId = req.params.bookId;
    let book=await booksModel.findById(bookId)
    
    if (decodedtoken.userId != book.userId) { return res.status(400).send({ status: false, msg: "You are not authorised" }) }
    next()
}

module.exports.authentication = authentication
module.exports.authorization = authorization