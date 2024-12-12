module.exports=function(app){
    app.post("/api/v1/staffs",function(req,res){
        const x = require("../src/staffs/create");
        x.main(req,res);
    })
    app.delete("/api/v1/staffs/:id",function(req,res){
        const x = require("../src/staffs/delete");
        x.main(req,res);
    })
    app.get("/api/v1/staffs/:id",function(req,res){
        const x = require("../src/staffs/get_by_id");
        x.main(req,res);
    })
    app.get("/api/v1/staffs",function(req,res){
        const x = require("../src/staffs/read");
        x.main(req,res);
    })
    app.put("/api/v1/staffs",function(req,res){
        const x = require("../src/staffs/update");
        x.main(req,res);
    })
    }