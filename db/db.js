const sqlite3 = require("sqlite3");

const createRoomTable = `CREATE TABLE chatRooms(name TEXT NOT NULL)`;

const db = new sqlite3.Database("./sqlite.db", (error) => {
  if (error) {
    console.log(error);
  }
});

// db.run(createRoomTable, (err, data) => {
//   if (err) return console.log(err);
//   console.log("table created");
// });

async function getAllRooms() {
  const sql = `SELECT * FROM chatRooms`;
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
      console.log(rows);
    });
  });
}

module.exports = { db, getAllRooms };
