const main =async(req,res)=>{
    const {branch_name,address}=req.body;
    console.log("req.body,",req.body)
    console.log("branch_name,address",branch_name,address);
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
    client.query("INSERT INTO branches(branch_name,address) VALUES($1,$2)",[branch_name,address],async function(error,result){
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
            response_message:"Created successfully"
        });
        // res.send("Created successfully");
    }
    await client.end();
});
}
module.exports={
    main
}