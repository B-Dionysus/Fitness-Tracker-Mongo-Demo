var db = require("../models");


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
        // res.json(data);
    })
}

module.exports={
    findMostRecentWorkout,
    findAllWorkouts
}