const { db } = require("../db/db");

function getAllRooms() {
  const sql = `SELECT * FROM chatRooms`;

  return db.query(sql, function (error, results) {
    if (error) {
      console.log(error.message);
    }
    return results.rows;
  });
}

module.exports = getAllRooms;
