const { db } = require("../db/db");

async function getAllRooms() {
  const sql = `SELECT * FROM chatRooms`;

  return db.query(sql, function (error, rows) {
    if (error) {
      console.log(error.message);
      reject(error);
    }
    return rows;
  });
}

module.exports = getAllRooms;
