const crypto = require("crypto"); //built in nodejs module
const ENCRYPTION_KEY = "bf3c199c2470cb477d907b1e0917c17b";
const IV = "5183666c72eec9e4";
const ALGORITHM = "aes-256-cbc";
const encryptPassword = (password) => {
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  // console.log(encrypted);
  return encrypted;
};
const decryptPassword = (password) => {
  const decypher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, IV);
  let decrypted = decypher.update(password, "hex", "utf8");
  decrypted += decypher.final("utf8");
  // console.log(decrypted);
  return decrypted;
};
module.exports = { encryptPassword, decryptPassword };
