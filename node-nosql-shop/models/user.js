const mongoDB = require('mongodb');
const getDb = require('../util/database').getDb;

class User{
  constructor(name, email){
    this.name = name;
    this.email = email;
  }

  createUser(){
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  static findUserById(userId){
    const db = getDb();
    return db.collection('users').find({_id: new mongoDB.ObjectId(userId)}).next()
    .then(user=>{
      return user
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
module.exports = User;
