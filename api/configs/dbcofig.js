const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const dbUrl = "mongodb://localhost:27017";
const dbName = "mern-3"

function dbConnection(cb){
    MongoClient.connect(dbUrl)
      .then((client) => {
        // success
          // select db 
          const db = client.db(dbName);
          cb(null, db);
      })
      .catch((err) => {
        cb(err);
      })
  
  }

module.exports = dbConnection;