const userModel = require("../models/userModel")
const validator= require("../validator/validator")



const createUser = async (req, res)=> {
    try{
        const data = req.body;
        if (Object.keys(data) == 0){return res.status(400).send({ status: false, msg: "Bad request, No data provided." })};

        const{title, name, phone, email, password} = data;

         // For name required true:
         if (!validator.isValid(title)){ return res.status(400).send({ status: false, msg: "Title is required" }) }

    
        userCreated = await userModel.create(data);
    
        res.status(201).send({status: true, message:"User created successfully", data:data})
    }  catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
   
}

module.exports.createUser=createUser