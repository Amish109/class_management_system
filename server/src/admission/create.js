const main =async(req,res)=>{
    const {student_id,course_id,fees,discount,final_fees,initial_payment,full_payment_done}=req.body;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
client.query("INSERT INTO admission(student_id,course_id,fees,discount,final_fees,initial_payment,full_payment_done) VALUES($1,$2,$3,$4,$5,$6,$7)",[student_id,course_id,fees,discount,final_fees,initial_payment,full_payment_done],async function(error,result){
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

