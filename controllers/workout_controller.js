var db = require("../models");

// db.Workout.totalDuration();

function findMostRecentWorkout(res, cb){
    db.Workout.findOne({}).sort({day:-1}) 
    .then((data)=>{
        // cb(data);
        res.json(data);
    })
}
function findAllWorkouts(res, cb){
    db.Workout.find({}).sort({day:1}) 
    .then((data)=>{
        cb(data);
    })
}
function insertWorkout(req, res, cb){
    db.Workout.create({day:Date.now()}) 
    
        .then(data=>{ cb(data);})
};

function addToWorkout(req,res, cb){ 
    db.Workout.updateOne(
        {_id:req.params.id},
        {
            $push:{
                exercises:req.body
            }
        }
    )
    .then(data=>{
        cb(data);
    })

}
module.exports={
    findMostRecentWorkout,
    findAllWorkouts,
    addToWorkout,
    insertWorkout
}