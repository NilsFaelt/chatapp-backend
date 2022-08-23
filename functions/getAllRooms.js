const { db } = require("../db/db");

function getAllRooms() {
  const sql = `SELECT * FROM chatRooms`;

  return db.query(sql, function (error, rows) {
    if (error) {
      console.log(error.message);
    }
    return rows;
  });
}

module.exports = getAllRooms;
