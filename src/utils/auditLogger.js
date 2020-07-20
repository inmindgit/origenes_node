var fs = require('fs');
var path = require('path');
var auditPath = path.join(__dirname, '../../audit.log')

function auditLogger(content){
  fs.writeFile(auditPath, content, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

module.exports = auditLogger;