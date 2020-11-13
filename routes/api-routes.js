
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
    
    // I was expecting the frontend to send specific dates to request
    // a "range".. but it just seems to want everything in the database
    // again, so there's actually no difference between this and /api/workouts/
    app.get("/api/workouts/range", (req,res)=>{
        findAllWorkouts(res, data=>{
            res.json(data);
        })
    });

    // If there's no id, then we're creating a new
    // workout with no exercises in it.
    app.post("/api/workouts/", (req, res) => {
        console.log("Hello?");
        insertWorkout(req, res, (data)=>{
            res.json(data);
        })
    });

    app.put("/api/workouts/:id", (req, res) => {
        addToWorkout(req, res, (data)=>{
            res.json(data);
        })

    });

    // This is called from the offlineDB, once we have restablished our
    // connection to the online db.
    app.post("/api/transaction/bulk", (req, res) => {

        // We will be building an array of database queries for bulkWrite() to work from
        let array=[];

        // First we go through all of the records that we've saved up while offline
        for(ex of req.body){
            id=ex.id;
            type=ex.transType;
            // transaction type and id are no longer needed
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
            res.json(data);
        });
    });


    
}

module.exports=apiRoutes;