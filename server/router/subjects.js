module.exports=function(app){
    app.post("/api/v1/subjects",function(req,res){
        const x = require("../src/subjects/create");
        x.main(req,res);
    })
    app.delete("/api/v1/subjects/:id",function(req,res){
        const x = require("../src/subjects/delete");
        x.main(req,res);
    })
    app.get("/api/v1/subjects/:id",function(req,res){
        const x = require("../src/subjects/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/subjects",function(req,res){
        const x = require("../src/subjects/read");
        x.main(req,res);
    })
    app.put("/api/v1/subjects",function(req,res){
        const x = require("../src/subjects/update");
        x.main(req,res);
    })
    }