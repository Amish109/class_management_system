  
module.exports=function(app){
    app.post("/api/v1/topics",function(req,res){
        const x = require("../src/topics/create");
        x.main(req,res);
    })
    app.delete("/api/v1/topics/:id",function(req,res){
        const x = require("../src/topics/delete");
        x.main(req,res);
    })
    app.get("/api/v1/topics/:id",function(req,res){
        const x = require("../src/topics/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/topics",function(req,res){
        const x = require("../src/topics/read");
        x.main(req,res);
    })
    app.put("/api/v1/topics",function(req,res){
        const x = require("../src/topics/update");
        x.main(req,res);
    })
    }