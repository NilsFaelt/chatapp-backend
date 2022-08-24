const { Client } = require("pg");
const createChatRooms = `CREATE TABLE IF NOT EXISTS chatRooms(name TEXT)`;
const testRoom = `CREATE TABLE IF NOT EXISTS messages(message TEXT, room TEXT, name TEXT, date TEXT)`;

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString: process.env.DATABASE_URL,
});

db.connect();

db.query(testRoom, (error) => {
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

async function insertMessage(data) {
  const insertMessages = `INSERT INTO messages(message, room, name, date) VALUES($1, $2, $3, $4)`;
  const reult = await db.query(insertMessages, [
    data.message,
    data.room,
    data.user,
    data.date,
  ]);

  return insertMessage;
}

module.exports = { db, insertMessage };
