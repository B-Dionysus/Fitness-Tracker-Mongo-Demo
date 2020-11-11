
var db = require("../models");
const router=require("express").router;
var path = require("path");
function htmlRoutes(app){


    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname,"../public/stats.html"));
    })

    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname,"../public/exercise.html"));
    })


}



module.exports=htmlRoutes;