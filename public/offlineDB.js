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

// Once we have opened out database, check to see it we are online
request.onsuccess = function (event) {
  db = event.target.result;
  if (navigator.onLine) {
    // If we're online, check to see if we have stuff in the db that needs to be
    // uploaded to the main online database
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log( '<li>Error loading database.</li>');
  console.log(event);
};
// This gets called if we are unable to store something in the main online
// database, and need to store it in our local db instead
function saveRecord(record) {
  db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  const transactionStore = transaction.objectStore("pending");
  transactionStore.add(record);        
}

// This gets called once we have an internet connection again
function checkDatabase() {
  db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  const transactionStore = transaction.objectStore("pending");

// We check to see if we have anything in the local db
  const getAll = transactionStore.getAll();
  getAll.onsuccess = function () {

    if (getAll.result.length > 0) {
      // If we do, upload it all to the online db
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
          // If we successfully stored everything online, clear out the local db
          db = request.result;
          const transaction = db.transaction(["pending"], "readwrite");
          const transactionStore = transaction.objectStore("pending");
          transactionStore.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
