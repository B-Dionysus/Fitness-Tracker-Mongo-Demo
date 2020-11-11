
const {findAllWorkouts}=require("../controllers/workout_controller.js");
const router=require("express").router;
function apiRoutes(app){


    app.get("/api/workouts", (req, res) => {
        findAllWorkouts(res, (data)=>{
            console.log("Callback:");
            res.json(data);
        })

    });
}
// app.get("/all", (req, res) => {
    //   db.notes.find({}, (err, data) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       res.json(data);


module.exports=apiRoutes;