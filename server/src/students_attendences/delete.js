const main =async(req,res)=>{
const {id}=req.params;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("DELETE FROM students_attendences WHERE id=$1",[id],function(error,result){
    if(error){
        res.json({
            success:false,
            error:error.toString(),
            data:[],
            response_message:"Error"
        });
    } else{
        res.json({
            success:true,
            error:null,
            data:[],
            response_message:"Deleted successfully"
        });
    }
});
}
module.exports={
    main
} 