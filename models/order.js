const getDb = require('../util/database').getDb;

class Orders{
  constructor(items, userId){
    this.items = items;
    this.userId = userId; 
  }

  save(){
    const db = getDb();
    return db.collection('orders').insertOne(this)    
  }
}

module.exports = Orders;