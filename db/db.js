const { Client } = require("pg");

const createMessages = `CREATE TABLE IF NOT EXISTS messages(chatRooms TEXT NOT NULL, message TEXT, user TEXT, date TEXT )`;

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString: process.env.DATABASE_URL,
});

db.connect();

db.query(createMessages, (error) => {
  if (error) {
    console.log(error.message);
    // throw error;
  }
});

function insertMessage(data) {
  const insertMessages = `INSERT INTO messages(message, chatRooms, user, date) VALUES($1, $2, $3, $4)`;
  return db.query(
    insertMessages,
    [data.message, data.room, data.user, data.date],
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("message inserted succesfully");
      return insertMessage;
    }
  );
}

module.exports = { db, insertMessage };
