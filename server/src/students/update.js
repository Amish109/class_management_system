const main =async(req,res)=>{
    const {id}=req.params;
    const keys = Object.keys(req.body);
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const update_data=[];
    Object.keys(req.body).map((element,index)=>{
        update_data.push(`${element}='${req.body[element]}'`)
    })
    const client=await postgre_sql_connector();
    client.query(`UPDATE students SET ${update_data.join(", ")} WHERE id=$1`,[id],async function(error,result){
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
                data:[],
                response_message:"Updated successfully"
            });
        }
   await client.end();
    });
    }
    module.exports={
        main
    } 