const isValid = (value)=>{
        if(typeof(value)=="undefined" || typeof(value)==null) return false;
        if(typeof(value).trim().length==0) return false;
        if(typeof(value)=="string" && typeof(value).trim.length>0) return true;
}

module.exports.isValid=isValid;