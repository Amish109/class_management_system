  
module.exports=function(app){
    app.post("/api/v1/users",function(req,res){
        const x = require("../src/users/create");
        x.main(req,res);
    })
    app.delete("/api/v1/users/:id",function(req,res){
        const x = require("../src/users/delete");
        x.main(req,res);
    })
    app.get("/api/v1/users/:id",function(req,res){
        const x = require("../src/users/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/users",function(req,res){
        const x = require("../src/users/read");
        x.main(req,res);
    })
    app.put("/api/v1/users/:id",function(req,res){
        const x = require("../src/users/update");
        x.main(req,res);
    })
    }