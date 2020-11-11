const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        unique: true
    },    
    day: {
        type:Date,
        deafult:Date.now
    },
    // exercises:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Exercise"
    // }]
    exercises:[
        // type:{type:String},
        // name:{type:String},
        // duraton:{type:Number},
        // weight:{type:Number},
        // reps:{type:Number},
        // sets:{type:Number}
    ]
  });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
