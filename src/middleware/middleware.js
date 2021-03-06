const jwt = require("jsonwebtoken");
const booksModel = require("../models/booksModel");


//AUTHENTICATION-
const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "login is required" })

        let decodedtoken = jwt.verify(token, "secret key")

        if (!decodedtoken) return res.status(400).send({ status: false, msg: "token is invalid" })
        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}



//AUTHORIZATION-
let authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedtoken = jwt.verify(token, "secret key")
        let bookId = req.params.bookId;

        let book = await booksModel.findById(bookId)
        if (!book) { return res.status(404).send({ status: false, msg: "There is no data inside the database with this id" }) }

        if (decodedtoken.userId != book.userId) { return res.status(403).send({ status: false, msg: "You are not authorised" }) }
        next()
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}



module.exports.authentication = authentication
module.exports.authorization = authorization
