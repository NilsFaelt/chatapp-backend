const { db } = require("../db/db");

async function getAllMessages(data) {
  const sql = `SELECT * FROM messages WHERE room = $1`;

  db.query(sql, [data.room], function (error, room) {
    if (error) {
      console.log(error.message);
      reject(error);
    }
    return room;
  });
}

module.exports = getAllMessages;
