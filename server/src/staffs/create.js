const main =async(req,res)=>{
    const {full_name,address,gender,mobile_number,email,age,dob,city,state,pincode,branch}=req.body;
const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
const client=await postgre_sql_connector();
const username= full_name.toLowerCase().split(" ").join("_");
const password= mobile_number;
const role= "staff";
client.query("INSERT INTO users(user_name,password,role) VALUES($1,$2,$3) RETURNING id",[username,password,role],async(error,result_data)=>{
    console.log("id from user",result_data.rows[0].id)
    if(!error){
        client.query("INSERT INTO staffs(full_name,address,gender,mobile_number,email,age,dob,city,state,pincode,branch,user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",[full_name,address,gender,mobile_number,email,age,dob,city,state,pincode,branch,result_data.rows[0].id],async function(error,result){
            if(error){
                    res.json({
                        success:false,
                        error:error.toString(),
                        data:[],
                        response_message:"Error"
                    });
                }  else{
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
    } else{
        res.json({
        success:false,
        error:error.toString(),
        data:[],
        response_message:"Error"
    });
    }
})

}
module.exports={
    main
}