const { db } = require("../db/db");

async function getAllRooms() {
  const sql = `SELECT * FROM chatRooms`;

  const result = await db.query(sql);
  return result.rows;
}

module.exports = getAllRooms;
