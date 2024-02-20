const admin = require('firebase-admin');
const serviceAccount = require('../config/db.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mydb-8dfe6-default-rtdb.firebaseio.com"
});

module.exports = admin;
