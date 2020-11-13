let db;
const request = window.indexedDB.open("fitnessTracker", 2);

request.onupgradeneeded = function (event) {
  // create object store called "pending" and set autoIncrement to true
  const db = event.target.result;
  if (event.oldVersion < 1) {
    // Creates an object store with a listID keypath that can be used to query on.
    const pending = db.createObjectStore("pending", {
      autoIncrement:true
    });
  }
};

request.onsuccess = function (event) {
  db = event.target.result;
  if (navigator.onLine) {
    console.log("we are online!");
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log( '<li>Error loading database.</li>');
  console.log(event);
};

function saveRecord(record) {
  db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  const transactionStore = transaction.objectStore("pending");
  console.log("Adding ");
  transactionStore.add(record);        
}

function checkDatabase() {
  console.log("Checking!");
  db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  const transactionStore = transaction.objectStore("pending");

  
  const getAll = transactionStore.getAll();
  getAll.onsuccess = function () {

    if (getAll.result.length > 0) {

      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          db = request.result;
          const transaction = db.transaction(["pending"], "readwrite");
          const transactionStore = transaction.objectStore("pending");
          transactionStore.clear();
          
  console.log("clearing");
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
