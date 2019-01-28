/**
 * Created by isaac on 15/10/28.
 */
import path from "path";
const uploadFolder = path.join(__dirname, "../../uploads");
module.exports = {
  code: {
    success: 1000,
    fail: 2000
  },
  db: "mongodb://localhost/DES",
  cosmosDB: 'mongodb://localhost/DES-cosmos-dev',
  testDB: "mongodb://localhost/DES-test",
  protocol: "DES://",
  uploadFolder,
  meta: {
    installed: "DES.installed"
  }
};
