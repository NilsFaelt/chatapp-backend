const { Client } = require("pg");

const createMessages = `CREATE TABLE IF NOT EXISTS messages(room TEXT NOT NULL, message TEXT, user TEXT, date INTEGER )`;

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString: process.env.DATABASE_URL,
});
db.connect();

db.query(createMessages, (err, data) => {
  if (err) return console.log(err);
  console.log("table created");
});

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

module.exports = { db, insertMessage };
