const fs = require('fs');
const path = require('path');

module.exports = {
  call() {
    const filePath = path.join(__dirname, '../data/actuaciones.txt');

    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      const newNumber = parseInt(data) + 1;
      fs.writeFileSync(filePath, newNumber, { ecoding: 'utf-8', flag: 'w' });

      return newNumber;
    } catch (e) {
      console.log(e);
    }
  }
}