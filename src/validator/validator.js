// const isValid = (value)=>{
//     if(typeof(value)=="undefined" || typeof(value)==null || value ==0) return false;
//     if(typeof(value).trim().length==0) return false;
//     if(typeof(value)=="string" && typeof(value).trim.length>0) return true;
// }

// module.exports.isValid=isValid;





const isValid = function(value){
if(typeof value == undefined ||  value ==null|| value == 0)return false
if(typeof value==='string'&&value.trim().length===0) return false
return true

}
module.exports.isValid=isValid; 