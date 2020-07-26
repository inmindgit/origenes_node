const auditLogger = require('../utils/auditLogger');

module.exports = {
  async create(req, res) {
    console.log(req.body);

    const { callerAddress, dateTime, functionName } = req.body
    
    auditLogger(`Time: ${dateTime} - caller addres: ${callerAddress} - function name: ${functionName}\n`);
    
    res.status(200).json({status:"ok"})
  }
}