const main =async(req,res)=>{
    const {name,marks,student_attendance}=req.body;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO exams_students(name,marks,student_attendance) VALUES($1,$2,$3)",[name,marks,student_attendance],async function(error,result){
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