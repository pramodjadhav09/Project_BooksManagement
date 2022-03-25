const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const validator=require("../validator/validator")

const login = async function (req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        const data = req.body

        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "Bad Request, No data provided" })

        // For email required in body :
        if (!validator.isValid(email)) { return res.status(400).send({ status: false, msg: "Email is required" }) }

        // For password required in body :
        if (!validator.isValid(password)) { return res.status(400).send({ status: false, msg: "Password is required" }) }
        
        // Finding the User in Data-Base :
        const userMatch = await userModel.findOne({ email: email, password: password })
        if (!userMatch) return res.status(400).send({ status: false, msg: "Email or Password is incorrect" })

        // If user found, then token will generate :
        const token = jwt.sign({
            userId: userMatch._id.toString(),
            batch:"thorium",
            groupNo:"19",
        }, "Group-19")

        res.setHeader("for-check", "token");
        return res.status(200).send({ status: true, msg: "You are successfully logged in", token })
    }

    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.login = login