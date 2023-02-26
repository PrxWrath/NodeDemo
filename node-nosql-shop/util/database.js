const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;

let db;

exports.mongoConnect = (callback) => {
  mongoClient.connect(process.env.MONGO_CONNECT_URL)
  .then(client=>{
    console.log("Connected");
    db = client.db();
    callback()
  })
  .catch(err=>{
    console.log(err);
  })
}

exports.getDb = () => {
  if(db){
    return db
  }
  throw "No database instance!";
}
