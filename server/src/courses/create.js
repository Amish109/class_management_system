const main =async(req,res)=>{
    const {name,duration}=req.body;
const {postgre_sql_connector} = require("../1_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO courses(name,duration) VALUES($1,$2)",[name,duration],function(error,result){
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