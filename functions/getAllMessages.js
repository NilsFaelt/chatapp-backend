const { db } = require("../db/db");

async function getAllMessages(data) {
  const sql = `SELECT * FROM messages WHERE room = ?`;

  db.query(sql, [data.room], function (error, results) {
    if (error) {
      console.log(error.message);
    }
    return results;
  });
}

module.exports = getAllMessages;
