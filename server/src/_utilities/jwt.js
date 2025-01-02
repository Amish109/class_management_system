const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("./env_config");
const  get_jwt_token=(data)=>{
   try {
    var token = jwt.sign(data, JWT_SECRET,{expiresIn:"2 days"});
    console.log("Ruchi",token);
    return token;
   } catch (error) {
    console.log("Error in generating jwt",error)
    return false
   }
}
const  verif_jwt_token=(token)=>{
    console.log("token",token)
    try {
        const verify=jwt.verify(token,JWT_SECRET);
        console.log("Ruchi",verify);
        return verify;
       } catch (error) {
        console.log("Ruchi",error);
       return (false)
       }
}
module.exports={
    get_jwt_token,verif_jwt_token
}