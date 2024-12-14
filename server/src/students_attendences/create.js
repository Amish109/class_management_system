const main =async(req,res)=>{
    const {attendence_id,student_id,is_present}=req.body;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO students_attendences(attendence_id,student_id,is_present) VALUES($1,$2,$3)",[attendence_id,student_id,is_present],function(error,result){
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