module.exports=function(app){
    app.post("/api/v1/branches",function(req,res){
        const x = require("../src/branches/create");
        x.main(req,res);
    })
    app.delete("/api/v1/branches/:id",function(req,res){
        const x = require("../src/branches/delete");
        x.main(req,res);
    })
    app.get("/api/v1/branches/:id",function(req,res){
        const x = require("../src/branches/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/branches",function(req,res){
        const x = require("../src/branches/read");
        x.main(req,res);
    })
    app.put("/api/v1/branches/:id",function(req,res){
        const x = require("../src/branches/update");
        x.main(req,res);
    })
    
    }