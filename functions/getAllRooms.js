const { db } = require("../db/db");

async function getAllRooms() {
  const sql = `SELECT * FROM chatRooms`;
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = getAllRooms;
