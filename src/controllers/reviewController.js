const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const validator = require("../validator/validator")


//CREATE REVIEW----------------------------------------

const createReview = async (req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, message: "Enter data for review" }) }

        if (!validator.isValid(data.bookId)) { return res.status(400).send({ status: false, message: "BookId is required" }) }
        if (!validator.isValid(data.reviewedAt)) { return res.status(400).send({ status: false, message: "ReviewedAt is required" }) }
        if (!validator.isValid(data.rating)) { return res.status(400).send({ status: false, message: "Rating is required" }) }
        if (data.rating<0 && data.rating>=5) { return res.status(400).send({ status: false, message: "Rating should be between 1 to 5" }) }

        let book = await booksModel.findOne({ _id: data.bookId, isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }

        let createData = await reviewModel.create(data);
        return res.status(201).send({ status: true, message: "Review successfully created", data: createData })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


//UPDATE REVIEW----------------------------------------

const updateReviews = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        let reviewId = req.params.reviewId
        let data = req.body;
        if (!data) { return res.status(400).send({ status: false, message: "Enter some data for update" }) }

        let book = await booksModel.findOne({ _id: bookId }, { isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }
        
        let checkReviewId = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!checkReviewId) { return res.status(400).send({ status: false, message: "No review exist with this id" }) }

        let updateReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId },
            { $set: { review: data.review, rating: data.rating, reviewedBy: data.reviewedBy, reviewedAt: Date.now() } }, { new: true })
        return res.status(200).send({ status: true, message: "Review updated successfully", review: updateReview })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


//DELETE REVIEW----------------------------------------

const deleteReview = async (req, res) => {
    try {
        let reviewId = req.params.reviewId
        let bookId = req.params.bookId

        let book = await booksModel.findOne({ bookId: bookId, isDeleted: false });
        if (!book) { return res.status(404).send({ status: false, message: "No book exist with this id" }) }

        let reviwe = await reviewModel.findOne({ reviewId: reviewId, bookId: bookId });
        if (reviwe.isDeleted == true) { return res.status(400).send({ status: false, msg: "Reviwe has already been deleted" }) }

        let deleteRev = await reviewModel.findOneAndUpdate({ _id: reviwe._id, bookId: reviwe.bookId, isDeleted: false },
            { $set: { isDeleted: true } })
        // let deleted = await reviewModel.findOne({ _id: reviwe._id, bookId: reviwe.bookId, isDeleted: true })
        // const count = await reviewModel.find({ bookId: reviwe.bookId, isDeleted: false })
        return res.status(200).send({ status: true, message: "Review deleted successfully"})
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

module.exports = {
    createReview,
    updateReviews,
    deleteReview
}