const { db } = require("../db/db");

async function getRoom(data) {
  const sql = `SELECT * FROM chatRooms WHERE name = ? `;

  db.all(sql, [data], (error, rows) => {
    if (error) {
      console.log(error.message);
    }
    return rows;
  });
}

module.exports = { getRoom };
