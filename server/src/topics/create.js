const main =async(req,res)=>{
    const {name,duration,subject_id}=req.body;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO topics(name,duration,subject_id) VALUES($1,$2,$3)",[name,duration,subject_id],function(error,result){
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