const main =async(req,res)=>{
    const {id}=req.params;
    const {postgre_sql_connector} = require("../1_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    client.query("SELECT * FROM admission WHERE id=$1",[id],function(error,result){
        if(error){
            console.log("error",error);
            res.send(error.toString());
        } else{
            console.log("result",result);
            res.send(result.rows);
    
        }
    });
    }
    module.exports={
        main
    } 