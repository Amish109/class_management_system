const main =async(req,res)=>{
    const {name,subject,date,exam_type}=req.body;
const {postgre_sql_connector} = require("../1_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO exams(name,subject,date,exam_type) VALUES($1,$2,$3,$4)",[name,subject,date,exam_type],function(error,result){
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