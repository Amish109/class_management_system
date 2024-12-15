module.exports=function(app){
    app.post("/api/v1/exams",function(req,res){
        const x = require("../src/exams/create");
        x.main(req,res);
    })
    app.delete("/api/v1/exams/:id",function(req,res){
        const x = require("../src/exams/delete");
        x.main(req,res);
    })
    app.get("/api/v1/exams/:id",function(req,res){
        const x = require("../src/exams/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/exams",function(req,res){
        const x = require("../src/exams/read");
        x.main(req,res);
    })
    app.put("/api/v1/exams/:id",function(req,res){
        const x = require("../src/exams/update");
        x.main(req,res);
    })
    }