module.exports=function(app){
    app.post("/api/v1/exam_types",function(req,res){
        const x = require("../src/exam_types/create");
        x.main(req,res);
    })
    app.delete("/api/v1/exam_types/:id",function(req,res){
        const x = require("../src/exam_types/delete");
        x.main(req,res);
    })
    app.get("/api/v1/exam_types/:id",function(req,res){
        const x = require("../src/exam_types/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/exam_types",function(req,res){
        const x = require("../src/exam_types/read");
        x.main(req,res);
    })
    app.put("/api/v1/exam_types/:id",function(req,res){
        const x = require("../src/exam_types/update");
        x.main(req,res);
    })
    }