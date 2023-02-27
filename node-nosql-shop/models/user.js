const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  cart:{
    items: [
      {
        prodId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true

        },
        quantity: Number
      }
    ]
  }
})
  
userSchema.methods.addToCart = function(product){
  let cartItems = this.cart.items
  let updatedCart;
  let qty=1;
  if(cartItems){
    const existing = cartItems.findIndex(item=>item.prodId.toString() === product);
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
  this.cart = updatedCart;
  return this.save();
}

userSchema.methods.removeFromCart = function(product){
    let cartItems = this.cart.items.filter(item=>item.prodId.toString() !== product);
    this.cart = {items: cartItems};
    return this.save();
}
module.exports = mongoose.model('User',userSchema);