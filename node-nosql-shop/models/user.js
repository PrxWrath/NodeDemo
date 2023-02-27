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

module.exports = mongoose.model('User',userSchema);