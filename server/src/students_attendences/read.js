const main =async(req,res)=>{
    const attendenceId = req?.query?.attendenceId;
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    if(attendenceId){
        // client.query("SELECT * FROM students_attendences WHERE attendence_id=$1",[attendenceId],async function(error,result){
        client.query(`WITH filtered_attendences AS (SELECT * FROM students_attendences WHERE attendence_id=$1)
SELECT filtered_attendences.id,attendences.id AS attendence_id,attendences.date,attendences.start_time,attendences.end_time,filtered_attendences.is_present,students.full_name FROM filtered_attendences
LEFT JOIN students ON 
filtered_attendences.student_id=students.id LEFT JOIN 
attendences ON
filtered_attendences.attendence_id=attendences.id;`,[attendenceId],async function(error,result){
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
        client.query("SELECT * FROM students_attendences",[],async function(error,result){
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