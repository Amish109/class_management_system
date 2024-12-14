const express = require("express");
var bodyParser = require('body-parser');
const cors = require("cors");
const app =express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./router")(app);
app.listen(9998,(error)=>{
    if(!error){
        console.log("App running on port 9998")
    }
})