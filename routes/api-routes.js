
const {findAllWorkouts}=require("../controllers/workout_controller.js");
const {addToWorkout}=require("../controllers/workout_controller.js");
const {insertWorkout}=require("../controllers/workout_controller.js");
const {bulkInsert}=require("../controllers/workout_controller.js");
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
        addToWorkout(req, res, (data)=>{
            console.log(data); // don't just return true
            res.json(data);
        })

    });
    app.post("/api/transaction/bulk", (req, res) => {
        let array=[];
        for(ex of req.body){
            console.log(ex);
            id=ex.id;
            type=ex.transType;
            delete ex.id;
            delete ex.transType;
            exercises=ex.exercises;
            let cmd;
            if(type==="updateOne"){                
                cmd={
                    updateOne:{
                        "filter":{_id:id},
                        "update":{
                            $push:{exercises}
                        }
                    }
                };
            }
            else if(type==="insertOne"){
                cmd={
                    insertOne:{
                        "document":{
                            "day":Date.now(),
                            "exercises":[{exercises}]
                        }
                    }
                }
            }
            array.push(cmd);
        }
        bulkInsert(array, (data)=>{
            console.log(data);
        });
    });


    
}
// app.get("/all", (req, res) => {
    //   db.notes.find({}, (err, data) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       res.json(data);


module.exports=apiRoutes;