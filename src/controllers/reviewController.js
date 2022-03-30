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

        id = await booksModel.findOne({ _id: data , isDeleted:false})
        if (!id) {
            return res.status(400).send({ status: false, message: "no book exist with this id" })
        }
        let createData = await reviewModel.create(review);
        return res.send({ status: true, message: "review successfully created", data: createData })

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


//UPDATEREVIEW-


const updateReviews = async function (req, res) {
    let getBookId = req.params.bookId;
    let getReviewId = req.params.reviewId
    let data = req.body;

    let checkBookId = await booksModel.findOne({ _id: getBookId }, { isDeleted: false })
    if (!checkBookId) { return res.status(400).send({ status: false, message: "no book exist with this id" }) }
    let checkReviewId = await reviewModel.findOne({ _id: getReviewId }, { isDeleted: false })
    if (!checkReviewId) { return res.status(400).send({ status: false, message: "no review exist with this id" }) }


    let updateReview = await reviewModel.findOneAndUpdate({ _id: getReviewId, bookId: getBookId },
        { $set: { review: data.review, rating: data.rating, reviewedBy: data.reviewedBy } }, { new: true })

    return res.status(200).send({ status: true, message: "review updated successfully", data: updateReview })

}

// const updateReviews = async function (req, res) {

//     try {

//         const reviewID = req.params.reviewId
//         const bookId = req.params.bookId
//         let updateData = req.body
//         let updateQuery = {}

//         if (!validator.isValid(updateData)) {
//             return res.status(400).send({ status: false, message: "Please Provide Data To Update" })
//         }

//         if (!validator.isValid(bookId)) {
//             return res.status(400).send({ status: false, message: "Invalid Book Id" })
//         }

//         let book = await booksModel.findOne({ _id: bookId, isDeleted: false })
//         if (!book) {
//             return res.status(404).send({ status: false, message: "Book Not Found, PLease check book Id" })
//         }
//         if (!validator.isValid(reviewID)) {
//             return res.status(400).send({ status: false, message: "Invalid ReviewId" })
//         }

//         let Review = await reviewModel.findOne({ _id: reviewID, isDeleted: false })
//         if (!Review) {
//             return res.status(404).send({ status: false, message: "Review Not Found, Please Check Review Id" })
//         }

//         if (Review['bookId'] != bookId) {
//             return res.status(400).send({ status: false, message: "This review dosent belong To given Book Id" })
//         }

//         let { reviewBy, rating, review } = updateData
//         let reviewKeys = ["reviewBy", "rating", "review"]
//         for (let i = 0; i < Object.keys(req.body).length; i++) {
//             let key = reviewKeys.includes(Object.keys(req.body)[i])
//             if (!key)
//                 return res.status(400).send({ status: false, msg: "Wrong Key present" })
//         }

//         if (Object.keys(updateData).includes("reviewBy")) {
//             if ((reviewBy.trim() == "") || (reviewBy == null)) {
//                 reviewBy = 'Guest'
//             }
//             if (typeof reviewBy !== 'string') {
//                 return res.status(400).send({ status: false, message: "Please Give a proper Name" })
//             }
//             updateQuery.reviewBy = reviewBy
//         }


//         if (Object.keys(updateData).includes("ratings")) {
//             if (typeof rating != 'number') {
//                 return res.status(400).send({ status: false, message: "invalid Rating Input" })
//             }
//             if (!(rating >= 1 && rating <= 5)) {
//                 return res.status(400).send({ status: false, message: "Invalid Rating! , please rate in beetween 1 to 5" })
//             }

//             updateQuery.rating = rating
//         }

//         if (Object.keys(updateReview).includes("reviews")) {

//             if (!validator.isValid(review)) {
//                 return res.status(400).send({ status: false, message: "Please Enter A Valid Review" })
//             }
//             updateQuery.review = review
//         }
//         if (Review['bookId'] == bookId) {

//             const updatedReview = await reviewModel.findOneAndUpdate({ _id: reviewID, isDeleted: false },
//                 { $set: updateQuery },
//                 { new: true }).select({ __v: 0 })

//             return res.status(200).send({ status: true, message: "Success", Data: updatedReview })


//         } else {
//             return res.status(400).send({ status: false, message: "This review dosent belong To given Book Id" })
//         }

//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message })
//     }
// }








module.exports.createReview = createReview
module.exports.updateReviews = updateReviews