const { db } = require("../db/db");

async function getRoom(data) {
  const sql = `SELECT * FROM chatRooms WHERE name = $1 `;

  db.query(sql, [data], (error, results) => {
    if (error) {
      console.log(error.message);
    }
    return results;
  });
}

module.exports = { getRoom };
