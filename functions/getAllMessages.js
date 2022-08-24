const { db } = require("../db/db");

async function getAllMessages(data) {
  const sql = `SELECT * FROM messages WHERE room = $1`;
  const result = await db.query(sql, [data.room], function (error, results) {
    return result;
  });
}

module.exports = getAllMessages;
