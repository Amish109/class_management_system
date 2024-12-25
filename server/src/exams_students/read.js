const main =async(req,res)=>{
    const examId = req?.query?.examId;
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    if(examId){
        // client.query("SELECT * FROM students_attendences WHERE attendence_id=$1",[attendenceId],async function(error,result){
        client.query(`WITH filtered_exams AS (SELECT * FROM exams_students WHERE exam_id=$1)
SELECT filtered_exams.id,exams.id AS exam_id,exams.date,subjects.name AS subject,exam_types.name AS exam_type,students.full_name ,filtered_exams.marks FROM filtered_exams
LEFT JOIN students ON 
filtered_exams.student_id=students.id LEFT JOIN 
exams ON
filtered_exams.exam_id=exams.id 
LEFT JOIN subjects ON exams.subject=subjects.id
LEFT JOIN exam_types ON exams.exam_type=exam_types.id;
;`,[examId],async function(error,result){
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
    }else{
        client.query("SELECT * FROM exams_students",[],async function(error,result){
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
    }
    module.exports={
        main
    } 