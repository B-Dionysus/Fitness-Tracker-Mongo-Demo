const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
    },    
    day: {
        type:Date,
        deafult:Date.now
    },
    exercises:[
        {   

        }
    ]
    },
    {  
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });

    // We'll "store" the total duration of every exercise in each workout here in this virtual field.
    // It isn't actually stored, of course, it's recalculated as needed.
  WorkoutSchema.virtual('totalDuration').get(function() {
      let totalDuration=0;
      for(elem of this.exercises){        
        totalDuration+=elem.duration;
      }
    return totalDuration;
  });



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
