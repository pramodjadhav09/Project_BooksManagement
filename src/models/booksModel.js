const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        required: true // mandatory
    },
    userId: {
        type: ObjectId,
        required: true, //mandatory, 
        ref: 'User'    //refs to user model
    },
    ISBN: {
        type: String,
        required: true,//mandatory,
        unique: true
    },
    category: {
        type: String,
        required: true //mandatory
    },
    subcategory: {
        type: String,
        required: true// mandatory
    },
    reviews: {
        type: Number,
        default: 0
        // comment: Holds number of reviews of this book
    },
    deletedAt: {
        type: Date, //when the document is deleted
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        default: Date.now()
        // format("YYYY-MM-DD")
    }
}, { timestamps: true });



module.exports = mongoose.model('books', bookSchema)