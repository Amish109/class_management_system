module.exports=function(app){
    app.post("/api/v1/subjects",function(req,res){
        const x = require("../src/admission/create");
        x.main(req,res);
    })
    app.delete("/api/v1/subjects/:id",function(req,res){
        const x = require("../src/admission/delete");
        x.main(req,res);
    })
    app.get("/api/v1/subjects/:id",function(req,res){
        const x = require("../src/admission/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/subjects",function(req,res){
        const x = require("../src/admission/read");
        x.main(req,res);
    })
    app.put("/api/v1/subjects",function(req,res){
        const x = require("../src/admission/update");
        x.main(req,res);
    })
    }