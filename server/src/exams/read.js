const main =async(req,res)=>{
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    client.query("SELECT * FROM exams",[],async function(error,result){
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