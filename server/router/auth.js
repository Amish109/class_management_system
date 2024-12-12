module.exports=function(app){
    app.post("/api/v1/signup",function(req,res){
        const x = require("../src/_auth/signup");
        x.main(req,res);
    })
    app.post("/api/v1/login",function(req,res){
        const x = require("../src/_auth/login");
        x.main(req,res);
    })
}