const { get_jwt_token } = require("../_utilities/jwt");

const main =async(req,res)=>{
    const{user_name,password}= req.body;
    const {postgre_sql_connector} = require("../_base/postgre_sql_connector"); 
    const client=await postgre_sql_connector();
    client.query( "SELECT * FROM users WHERE user_name=$1",[user_name],async (error,data)=>{
        console.log("data.rows[0]",data.rows[0]);
        console.log("user_name,password",user_name,password);
        console.log("data.rows[0]?.password.toString() !== password.toString()",data.rows[0]?.password.toString() !== password.toString());
        if(error){
            res
            .status(500)
            .json({
                success:false,
                error:error.toString(),
                data:[],
                response_message:"Error"
            });
        } else if(data.rows.length==0){
            res
            .status(400)
            .json({
                success:false,
                error:"No account found with this user name",
                data:[],
                response_message:"Error"
            });
        } else if(data.rows[0]?.password.toString() !== password.toString()){
            res
            .status(400)
            .json({
                success:false,
                error:"Incorrect password..",
                data:[],
                response_message:"Error"
            });
        } else{
            const user_table = data.rows[0]?.role =="student"?"students":data.rows[0]?.role =="staff"?"staffs":null;
            let user_data={};
            if(user_table){
                let user_data_response=await client.query(`SELECT id AS data_id FROM ${user_table} WHERE user_id = $1`,[data.rows[0]?.id]);
                user_data=user_data_response.rows[0];
            }
            const jwt_token =get_jwt_token({...data.rows[0],...user_data});
            if(jwt_token===false){
              return res
                .status(500)
                .json({
                    success:false,
                    error:"Error in generating authentication token",
                    data:[],
                    response_message:"Error"
                });
            } else{
                res.json({
                    success:true,
                    error:null,
                    data:{
                        user_data:{...data.rows[0],...user_data},
                        jwt_token
                    },
                    response_message:"Logged in sucessfully!"
                });
            }

        }
        await client.end();
    });
}
module.exports={
    main
}