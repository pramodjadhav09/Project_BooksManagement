const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const validator = require("../validator/validator")




const createReview = async function (req, res) {

    try {
        let data = req.params.bookId
        let review = req.body;

        if (!review) { return res.status(400).send({ status: false, message: "enter data for review" }) }

        let { bookId, reviewedBy, reviewedAt, rating } = review

        if (!validator.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "bookId is required" })
        }

        if (!validator.isValid(reviewedBy)) {
            return res.status(400).send({ status: false, message: "reviewedBy is required" })
        }

        if (!validator.isValid(reviewedAt)) {
            return res.status(400).send({ status: false, message: "reviewedAt is required" })
        }

        if (!validator.isValid(rating)) {
            return res.status(400).send({ status: false, message: "rating is required" })
        }

        id = booksModel.findOne({ _id: data })
        if (id) {
            let createData = await reviewModel.create(review);
            return res.send({ status: true, message: "review successfully created", data: createData })
        } else {
            return res.status(400).send({ status: false, message: "no book exist with this id" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}



module.exports.createReview = createReview