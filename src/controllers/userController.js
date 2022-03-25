const userModel = require("../models/userModel")



const createUser = async (req, res)=> {
    const data = req.body;
    userCreated = await userModel.create(data);

    res.status(201).send({status: true, message:"User created successfully", data:data})
}

module.exports.createUser=createUser