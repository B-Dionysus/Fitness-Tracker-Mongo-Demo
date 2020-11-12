const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };
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
    exercises:[
        {   
            // type:String,
            // name:String,
            // duration:Number,
            // weight:Number,
            // reps:Number,
            // distance:Number,
            // sets:Number
        }
    ]
    },
    {  
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });
  WorkoutSchema.virtual('totalDuration').get(function() {
      let x=0;
      for(elem of this.exercises){        
        x=elem.duration;
      }
    return x;
  });



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
