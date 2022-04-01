
//VALODATIONFUNCTIONs-


//FUNCTION1-
const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


//FUNCTION2-
const isValidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0
}



module.exports.isValid = isValid;
module.exports.isValidRequestBody = isValidRequestBody;
