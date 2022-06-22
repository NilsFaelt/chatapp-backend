fs = require("fs");

function loggMessages(data) {
  const fsData = JSON.stringify(data);
  if (data.message) {
    fs.appendFile("messageLogg.txt", fsData + "\n", (err) => {
      if (err) {
        console.log("Couldnt logg message, string were empty");
      } else {
        console.log("message logged sucessfully");
      }
    });
  }
}

module.exports = loggMessages;
