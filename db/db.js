const { Client } = require("pg");

const createMessages = `CREATE TABLE IF NOT EXISTS messages(message TEXT, room TEXT, user TEXT, date TEXT )`;
const createChatRooms = `CREATE TABLE IF NOT EXISTS chatRooms(name TEXT)`;

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
db.query(createChatRooms, (error) => {
  if (error) {
    console.log(error.message);
    // throw error;
  }
});

function insertMessage(data) {
  const insertMessages = `INSERT INTO messages(message, room, user, date) VALUES($1, $2, $3, $4)`;
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
