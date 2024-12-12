const main =async(req,res)=>{
    const {start_time, end_time, subject_id}=req.body;
const {postgre_sql_connector} = require("../1_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO attendance(start_time, end_time, subject_id) VALUES($1,$2,$3)",[start_time, end_time, subject_id],function(error,result){
    if(error){
        res.send(error.toString());
    } else{
        res.send("Created successfully");
    }
});
}
module.exports={
    main
}