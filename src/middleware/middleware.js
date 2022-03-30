const jwt = require("jsonwebtoken")

const authentication = async function (req, res, next) {
    try {
        // Checking for header :
        let token = req.headers["for-check"];
        if (!token) return res.status(400).send({ status: false, msg: "login is required" })

        // Checking the token :
        let decodedtoken = jwt.verify(token, "Group-19")
        if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
        req.decodedtoken = decodedtoken
        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

let authorization = async function (req, res, next) {

    let token = req.headers["for-check"];
    let decodedtoken = jwt.verify(token, "Group-19")
    let getUserId = req.body.userId;
    let Userid = req.params.userId;
    if (decodedtoken.userId != (getUserId || Userid)) { return res.status(400).send({ status: false, msg: "user not valid" }) }
    next()
}

module.exports.authentication = authentication

module.exports.authorization = authorization