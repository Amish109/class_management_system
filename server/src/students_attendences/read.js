const main =async(req,res)=>{
    const attendenceId = req?.query?.attendenceId;
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    if(attendenceId){
        client.query("SELECT * FROM students_attendences WHERE attendence_id=$1",[attendenceId],async function(error,result){
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