const CryptoJS = require("crypto-js");
let SECRET_KEY = process.env.SECRET_KEY

module.exports = {
  encryptString(string) {
    try {
      const encryptedString = CryptoJS.AES.encrypt(string, SECRET_KEY).toString();
      
      return encryptedString;
    } catch (e) {
      console.log(e)
    }
  },

  decryptString(encryptedString) {
    try {
      const bytes  = CryptoJS.AES.decrypt(encryptedString, SECRET_KEY);
      const originalString = bytes.toString(CryptoJS.enc.Utf8);

      return originalString;
    } catch (e) {
      console.log(e)
    }
  }
}
