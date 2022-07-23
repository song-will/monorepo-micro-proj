const fs = require('fs');
const path = require('path');
const charset = 'utf-8';

function appendFileText(text, file){
  fs.appendFileSync(file, "\r\n", charset);
  fs.appendFileSync(file, text, charset);
}

module.exports = {
  appendFileText
}
 