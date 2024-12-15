const main =async(req,res)=>{
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    // client.query("SELECT * FROM students",[],async function(error,result){
    client.query(`SELECT 
students.id,students.full_name,students.address,students.gender,students.mobile_number,students.email,students.roll_no,
students.age,students.dob,students.city,students.state,
students.pincode,branches.branch_name FROM students LEFT JOIN branches ON students.branch = branches.id;`,[],async function(error,result){
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