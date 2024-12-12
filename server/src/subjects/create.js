const main =async(req,res)=>{
    const {name,duration,course_id}=req.body;
const {postgre_sql_connector} = require("../1_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO subjects(name,duration,course_id) VALUES($1,$2,$3)",[name,duration,course_id],function(error,result){
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