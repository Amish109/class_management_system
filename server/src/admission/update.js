const main =async(req,res)=>{
    const {id}=req.params;
    const keys = Object.keys(req.body);
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const update_data=[];
    Object.keys(req.body).map((element,index)=>{
        update_data.push(`${element}='${req.body[element]}'`)
    })
    const client=await postgre_sql_connector();
    client.query(`UPDATE admission SET ${update_data.join(", ")} WHERE id=$1`,[id],function(error,result){
        if(error){
            console.log("error",error);
            res.send(error.toString());
        } else{
            console.log("result",result);
            res.send("Updated successfully");
    
        }
    });
    }
    module.exports={
        main
    } 