const main =async(req,res)=>{
    const {name,duration,course_id}=req.body;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO subjects(name,duration,course_id) VALUES($1,$2,$3)",[name,duration,course_id],async function(error,result){
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
await client.end();
});
}
module.exports={
    main
}