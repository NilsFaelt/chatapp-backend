const { db } = require("../db/db");

async function getRoom(data) {
  const sql = `SELECT * FROM chatRooms WHERE name = ? `;
  return new Promise((resolve, reject) => {
    db.all(sql, [data], (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = { getRoom };
