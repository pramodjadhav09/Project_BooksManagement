const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const validator = require("../validator/validator")


//CREATEREVIEW-

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


//UPDATEREVIEW-


const updateReviews = async function (req, res) {
    let getBookId = req.params.bookId;
    let getReviewId = req.params.reviewId
    let data = req.body;

    // let checkBookId = await booksModel.findOne({ _id: getBookId }, { isDeleted: false })
    // if (!checkBookId) { return res.status(400).send({ status: false, message: "no book exist with this id" }) }
    // let checkReviewId = await reviewModel.findOne({ _id: getReviewId }, { isDeleted: false })
    // if (!checkReviewId) { return res.status(400).send({ status: false, message: "no review exist with this id" }) }

    let updateReview = await reviewModel.findOneAndUpdate({ _id: getReviewId, bookId: getBookId },
        { $set: { review: data.review, rating: data.rating, reviewedBy: data.reviewedBy } }, { new: true })

    return res.status(200).send({ status: true, message: "review updated successfully", data: updateReview })

}





module.exports.createReview = createReview
module.exports.updateReviews = updateReviews