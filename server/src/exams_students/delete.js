const main =async(req,res)=>{
const {id}=req.params;
const {postgre_sql_connector} = require("../1_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("DELETE FROM exams_students WHERE id=$1",[id],function(error,result){
    if(error){
        console.log("error",error);
        res.send(error.toString());
    } else{
        console.log("result",result);
        res.send("Deleted successfully");

    }
});
}
module.exports={
    main
} 