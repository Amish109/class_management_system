module.exports=function(app){
    app.post("/api/v1/students",function(req,res){
        const x = require("../src/students/create");
        x.main(req,res);
    })
    app.delete("/api/v1/students/:id",function(req,res){
        const x = require("../src/students/delete");
        x.main(req,res);
    })
    app.get("/api/v1/students/:id",function(req,res){
        const x = require("../src/students/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/students",function(req,res){
        const x = require("../src/students/read");
        x.main(req,res);
    })
    app.put("/api/v1/students",function(req,res){
        const x = require("../src/students/update");
        x.main(req,res);
    })
    }