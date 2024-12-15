const main =async(req,res)=>{
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    client.query( `SELECT 
            staffs.id,staffs.full_name,staffs.address,staffs.gender,staffs.mobile_number,staffs.email,
            staffs.age,staffs.dob,staffs.city,staffs.state,
            staffs.pincode,branches.branch_name FROM staffs LEFT JOIN branches ON staffs.branch = branches.id;`,[],async function(error,result){
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