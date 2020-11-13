var db = require("../models");

// Technically, I think the front end should have requested only the most recent workout for the root
// page, since its just discarding the rest of them anyway. That would have looked like this:
function findMostRecentWorkout(res, cb){
    db.Workout.findOne({}).sort({day:-1}) 
    .then((data)=>{
        // cb(data);
        res.json(data);
    })
}
// But instead, it wants every single workout in the database:
function findAllWorkouts(res, cb){
    db.Workout.find({}).sort({day:1}) 
    .then((data)=>{
        cb(data);
    })
}
// Create a brand new workout in the database
function insertWorkout(req, res, cb){
    db.Workout.create({day:Date.now()}) 
    
        .then(data=>{ cb(data);})
};

// update an existing workout with more exercises.
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
};
// This is for the offlineDB.js. While the user does not have access to the internet, we
// keep copies of all of their transactions on their indexDB. Once their connection is
// restored, bulkInsert puts them all in our Mono database at once, using bulkWrite.
function bulkInsert(data, cb){
    db.Workout.bulkWrite(data)
        .then(dbTransaction => {
        cb(dbTransaction);
        })
        .catch(err => {
        cb((err));
        });
}

module.exports={
    findMostRecentWorkout,
    findAllWorkouts,
    addToWorkout,
    insertWorkout,
    bulkInsert
}