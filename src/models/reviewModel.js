const mongoose= require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const reviweSchema = new mongoose.Schema({
    bookId: {
        type:ObjectId, 
        required:true, //mandatory, 
        ref:'books' //refs to book model
    },
    reviewedBy:{
        type:String, 
        // required:true,//mandatory,
        default: 'Guest',
        //value: "reviewer's name"
    },
    reviewedAt:{
        type:Date, 
        reduired:true//mandatory
    },
    rating:{
        type:Number, 
        // min: 1,
        // max: 5,
        required:true// mandatory
    },
    review: {
        type:String, 
        // optional
    },
    isDeleted: {
        type:Boolean, 
        default: false
    },
  })

  module.exports = mongoose.model('review', reviweSchema )


  
