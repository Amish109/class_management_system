const main =async(req,res)=>{
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    client.query("SELECT * FROM staffs",[],function(error,result){
        if(error){
            console.log("error",error);
            res.send(error.toString());
        } else{
            console.log(result?.rows);
            res.send(result?.rows);
        }
    });
    }
    module.exports={
        main
    } 