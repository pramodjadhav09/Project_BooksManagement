const mongoose= require('mongoose')




const userSchema= new mongoose.Schema({

    title: {
        type:String,
        required:[true, "Title is required"],
        enum:["Mr","Mrs","Miss"]
    },
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    phone:{
        type:String,
        required:[true, "Phone is required"],
        unique: [true, "User with this phone already exist"],
        validate: {
            validator: function validatePhoneNumber(number) {
                var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

                return re.test(number);
            }, message: "Please provide a valid mobile number"
        }
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique: [true, "User with this email already exist"],
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: "Please provide a valid email address"
        }
    },
    password:{
        type:String,
        required: [true, "Password is required"],
    }




})