const sqlite3 = require("sqlite3");

// const createMessages = `CREATE TABLE messages(room TEXT NOT NULL, message TEXT, user TEXT, date TEXT )`;

const db = new sqlite3.Database("./sqlite.db", (error) => {
  if (error) {
    console.log(error);
  }
});

// db.run(createMessages, (err, data) => {
//   if (err) return console.log(err);
//   console.log("table created");
// });

function insertMessage(data) {
  const insertMessages = `INSERT INTO messages(message, room, user, date) VALUES(?,?,?,?) `;
  db.run(
    insertMessages,
    [data.message, data.room, data.user, data.date],
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("message inserted succesfully");
    }
  );
}

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

module.exports = { db, insertMessage, getAllRooms };
