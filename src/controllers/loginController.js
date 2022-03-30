const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const validator = require("../validator/validator")

const login = async function (req, res) {
    try {
        const data = req.body

        const {email,password}=data;

        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "Bad Request, No data provided" })
     
        // For email required in body :
        if (!validator.isValid(email)) { return res.status(400).send({ status: false, msg: "Email is required" }) };
        
        // For a valid email:
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email.trim()))){return res.status(400).send({ status:false, msg: "Please enter a valid Email."})};
        // For a valid password:
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password))) { return res.status(400).send({ status: false, msg: "please provide a valid password with one uppercase letter ,one lowercase, one character and one number " }) }

        // For password required in body :
        if (!validator.isValid(password)) { return res.status(400).send({ status: false, msg: "Password is required" }) };

        // Finding the User in Data-Base :
        const userMatch = await userModel.findOne({ email: data.email, password: data.password })
        if (!userMatch) return res.status(400).send({ status: false, msg: "Email or Password is incorrect" })

        // If user found, then token will generate :
        const token = jwt.sign({
            userId: userMatch._id.toString(),
            batch:"Thorium",
            groupNo:"19"
        }, "Group-19", {expiresIn: "30m" })

        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, msg: "You are successfully logged in", token })
    }

    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.login = login