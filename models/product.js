const getDb = require('../util/database').getDb
const mongoDB = require('mongodb');

class Product{
  constructor(title, price, description, imageUrl, id, userId){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id
    this.userId = new mongoDB.ObjectId(userId);
  }

  save(){
    const db = getDb();
    let op;
    if(this._id){
      op = db.collection('products').updateOne({_id: new mongoDB.ObjectId(this._id)}, {$set: this})
    }else{
      op = db.collection('products').insertOne(this)
    }
    return op
    .catch(err=>{
      console.log(err);
    })
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
    .then(products=>{
      return products
    })
    .catch(err=>{
      console.log(err);
    })
  }

  static findById(prodId){
    const db = getDb();
    return db.collection('products').find({_id: new mongoDB.ObjectId(prodId)}).next()
    .then(product=>{
      return product
    })
    .catch(err=>{
      console.log(err);
    })
  }

  static remove(prodId){
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongoDB.ObjectId(prodId)})
    .catch(err=>{
      console.log(err);
    })
  }
}


module.exports = Product;
