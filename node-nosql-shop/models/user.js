const mongoDB = require('mongodb');
const getDb = require('../util/database').getDb;

class User{
  constructor(name, email, cart, id){
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  createUser(){
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  addToCart(product) {
    const db = getDb();
    let cartItems = this.cart.items
    let updatedCart;
    let qty=1;
    if(cartItems){
      const existing = cartItems.findIndex(item=>item.prodId === product);
      if(existing<0){
        cartItems = [...cartItems, {prodId:product, quantity:qty}]//create new product entry
        updatedCart = {items: cartItems}       
      }else{
        qty = cartItems[existing].quantity+1 //increase quantity
        cartItems[existing].quantity = qty
        updatedCart = {items: cartItems}
      }
    }else{
      updatedCart = {items: [{prodId: product, quantity:qty}]} //create new product entry
    }
    
    return db.collection('users').updateOne({_id: new mongoDB.ObjectId(this._id)}, {$set: {cart: updatedCart}})
  }

  getCart(){
    const db = getDb();
    const prodIds = this.cart.items.map(item=>{
      return new mongoDB.ObjectId(item.prodId) //all product ids stored in user's cart
    })

    return db.collection('products').find({_id: {$in: prodIds}}).toArray()   //get all products with matching ids from products collection
    .then(products=>{
      return products.map(product=>{
        
        return {
        ...product,
        quantity: this.cart.items.find(item=>item.prodId === product._id.toString()).quantity
        }
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
  
  removeFromCart(product){
    const db = getDb();
    let cartItems = this.cart.items.filter(item=>item.prodId !== product);
    let updatedCart = {items: cartItems};

    return db.collection('users').updateOne({_id: new mongoDB.ObjectId(this._id)}, {$set: {cart: updatedCart}});
  }

  static findUserById(userId){
    const db = getDb();
    return db.collection('users').findOne({_id: new mongoDB.ObjectId(userId)})
    .then(user=>{
      return user
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
module.exports = User;
