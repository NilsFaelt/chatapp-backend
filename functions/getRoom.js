const { db } = require("../db/db");

async function getRoom(data) {
  const sql = `SELECT * FROM chatRooms WHERE name = $1 `;

  const results = await db.query(sql, [data]);
  return results.rows;
}

module.exports = { getRoom };
