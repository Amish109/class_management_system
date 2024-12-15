module.exports=function(app){
    app.post("/api/v1/exams_students",function(req,res){
        const x = require("../src/exams_students/create");
        x.main(req,res);
    })
    app.delete("/api/v1/exams_students/:id",function(req,res){
        const x = require("../src/exams_students/delete");
        x.main(req,res);
    })
    app.get("/api/v1/exams_students/:id",function(req,res){
        const x = require("../src/exams_students/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/exams_students",function(req,res){
        const x = require("../src/exams_students/read");
        x.main(req,res);
    })
    app.put("/api/v1/exams_students/:id",function(req,res){
        const x = require("../src/exams_students/update");
        x.main(req,res);
    })
    }