const main =async(req,res)=>{
    const {branch_name,address}=req.body;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO branches(branch_name,address) VALUES($1,$2)",[branch_name,address],function(error,result){
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