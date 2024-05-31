const fs = require("fs");
const path = require("path");
function readFileAsBytes(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
  }
module.exports=readFileAsBytes
