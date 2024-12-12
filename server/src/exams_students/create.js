const main =async(req,res)=>{
    const {name,marks,student_attendance}=req.body;
const {postgre_sql_connector} = require("../1_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO exams_students(name,marks,student_attendance) VALUES($1,$2,$3)",[name,marks,student_attendance],function(error,result){
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