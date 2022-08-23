const { db } = require("../db/db");

async function getRoom(data) {
  const sql = `SELECT * FROM chatRooms WHERE name = $1 `;

  db.all(sql, [data], (error, rows) => {
    if (error) {
      console.log(error.message);
      reject(error);
    }
    return rows;
  });
}

module.exports = { getRoom };
