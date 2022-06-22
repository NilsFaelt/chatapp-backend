const { db } = require("../db/db");

async function getAllMessages(data) {
  const sql = `SELECT * FROM messages WHERE room = ?`;
  return new Promise((resolve, reject) => {
    db.all(sql, [data.room], (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = getAllMessages;
