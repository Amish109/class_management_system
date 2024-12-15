const main =async(req,res)=>{
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    client.query(`SELECT subjects.id,subjects.name,subjects.duration,courses.name AS course FROM subjects LEFT JOIN courses ON subjects.course_id = courses.id;`,[],async function(error,result){
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