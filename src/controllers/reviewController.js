const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const validator = require("../validator/validator")


//CREATEREVIEW--------

const createReview = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, message: "Enter data for review" }) }

        if (!validator.isValid(data.bookId)) { return res.status(400).send({ status: false, message: "BookId is required" }) }
        if (!validator.isValid(data.reviewedAt)) { return res.status(400).send({ status: false, message: "ReviewedAt is required" }) }
        if (!validator.isValid(data.rating)) { return res.status(400).send({ status: false, message: "Rating is required" }) }
        if (!(data.rating >= 1 && data.rating <= 5)) { return res.status(400).send({ status: false, message: "Rating value should be between 1 to 5" }) }

        let book = await booksModel.findOne({ _id: data.bookId, isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }

        let createData = await reviewModel.create(data);
        return res.status(201).send({ status: true, message: "Review successfully created", data: createData })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


//UPDATEREVIEW----------

const updateReviews = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        let reviewId = req.params.reviewId
        let data = req.body;
        if (!data) { return res.status(400).send({ status: false, message: "Enter some data for update" }) }

        let book = await booksModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }
       
        let checkReviewId = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!checkReviewId) { return res.status(400).send({ status: false, message: "No review exist with this id" }) }

        let updateReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId },
            { $set: { review: data.review, rating: data.rating, reviewedBy: data.reviewedBy, reviewedAt: Date.now() } }, { new: true })

        let result = {
            bookId: book._id,
            title: book.title,
            excerpt: book.excerpt,
            userId: book.userId,
            category: book.category,
            reviews: book.review,
            releasedAt: book.releasedAt,
            reviewsData: updateReview
        };
        return res.status(200).send({ status: true, message: "Review updated successfully", bookDetailsWithReview: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


//DELETEREVIEW--------

const deleteReview = async (req, res) => {
    try {
        let reviewId = req.params.reviewId
        let bookId = req.params.bookId

        let book = await booksModel.findOne({ _id: bookId, isDeleted: false });
        if (!book) { return res.status(404).send({ status: false, message: "No book exist with this id" }) }

        let review = await reviewModel.findOne({ _id: reviewId, bookId: bookId });
        if (!review) { return res.status(400).send({ status: false, msg: "Review id should be checked, id is not from this book." }) }
        if (review.isDeleted == true) { return res.status(400).send({ status: false, msg: "Reviwe has already been deleted" }) }

        let deleteReview = await reviewModel.findOneAndUpdate({ _id: review._id, bookId: review.bookId, isDeleted: false },
            { $set: { isDeleted: true } })
        let count = await booksModel.findOneAndUpdate({ _id: book._id }, { $inc: { review: -1 } })
        // let deleted = await reviewModel.findOne({ _id: reviwe._id, bookId: reviwe.bookId, isDeleted: true })
        // const count = await reviewModel.find({ bookId: reviwe.bookId, isDeleted: false })
        return res.status(200).send({ status: true, message: "Review deleted successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error.message })
    }
}

module.exports = {
    createReview,
    updateReviews,
    deleteReview
}