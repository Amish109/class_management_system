module.exports=function(app){
    app.post("/api/v1/students_attendences",function(req,res){
        const x = require("../src/students_attendences/create");
        x.main(req,res);
    })
    app.delete("/api/v1/students_attendences/:id",function(req,res){
        const x = require("../src/students_attendences/delete");
        x.main(req,res);
    })
    app.get("/api/v1/students_attendences/:id",function(req,res){
        const x = require("../src/students_attendences/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/students_attendences",function(req,res){
        const x = require("../src/students_attendences/read");
        x.main(req,res);
    })
    app.put("/api/v1/students_attendences",function(req,res){
        const x = require("../src/students_attendences/update");
        x.main(req,res);
    })
    }