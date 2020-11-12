
const {findAllWorkouts}=require("../controllers/workout_controller.js");
const {addToWorkout}=require("../controllers/workout_controller.js");
const {insertWorkout}=require("../controllers/workout_controller.js");
const router=require("express").router;
function apiRoutes(app){


    app.get("/api/workouts", (req, res) => {
        findAllWorkouts(res, (data)=>{
            res.json(data);
        })

    });
    

    app.get("/api/workouts/range", (req,res)=>{
        findAllWorkouts(res, data=>{
            res.json(data);
        })
    });

    
    app.post("/api/workouts/", (req, res) => {
        insertWorkout(req, res, (data)=>{
            res.json(data);
        })
    });

    app.put("/api/workouts/:id", (req, res) => {
        
        console.log("HI2-----------------------------------------------------------");
        addToWorkout(req, res, (data)=>{
            console.log(data); // don't just return true
            res.json("true");
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