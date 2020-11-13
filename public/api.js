const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .catch((err) => {
      // If they user can't reach our database, temporarily store it in 
      // their indexDB. We'll also need to pass some useful data, like the 
      // id of the workout, and whether we are creating a new workout or updating
      // an existing one.
      if(!data._id) data.id=id;
      data.transType="updateOne";
      saveRecord(data);    
    })
    .then((res)=>{
      const json = res.json();
      return json;
    });


  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    // We should really check to see if we fail to create a workout here and, if not,
    // put that transaction in our indexDB for later. Sadly, I couldn't get that to work, though.
    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
