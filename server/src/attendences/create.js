const main =async(req,res)=>{
    const {start_time, end_time, subject_id}=req.body;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO attendance(start_time, end_time, subject_id) VALUES($1,$2,$3)",[start_time, end_time, subject_id],function(error,result){
   if(error){
        res.json({
            success:false,
            error:error.toString(),
            data:[],
            response_message:"Error"
        });
    }  else{
        res.json({
            success:true,
            error:null,
            data:[],
            response_message:"Created successfully"
        });
        // res.send("Created successfully");
    }
});
}
module.exports={
    main
}