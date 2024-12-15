const main =async(req,res)=>{
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    client.query(`SELECT exams.id,exams.name,exams.date,subjects.name AS subject,exam_types.name AS "exam type" FROM exams LEFT JOIN subjects ON exams.subject=subjects.id LEFT JOIN exam_types ON exams.exam_type = exam_types.id;`,[],async function(error,result){
        if(error){
        res.json({
            success:false,
            error:error.toString(),
            data:[],
            response_message:"Error"
        });
        } else{
           res.json({
                success:true,
                error:null,
                data:result.rows,
                response_message:"Data Fetched successfully"
            });
        }
   await client.end();
    });
    }
    module.exports={
        main
    } 