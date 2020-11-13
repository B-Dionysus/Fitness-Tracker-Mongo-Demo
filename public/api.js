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
      // their indexDB
      data.id=id;
      data.transType="updateOne"
      saveRecord(data);
      
      // clear form
      // nameEl.value = '';
      // amountEl.value = '';
    })
    .then(()=>{
      // You can't simply assume that you'll get a response--what if the user loses
      // their internet connection? 
      const json = 1;//res.json();
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
   return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
