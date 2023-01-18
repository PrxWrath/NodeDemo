const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);
  
module.exports = class cart{
    static addProduct(id, price){
        fs.readFile(p, (err, data)=>{
            let cart = {products:[], total:0};
            if(!err){
                cart = JSON.parse(data);
            }
        

            let existingIndex = cart.products.findIndex(item => item.id===id);
            let existing = cart.products[existingIndex];
            let newProduct;
            if(existing){
                newProduct = {...existing};
                newProduct.qty += 1; 
                cart.products = [...cart.products];
                cart.products[existingIndex] = newProduct;
            }else{
                newProduct = {id: id, qty:1}
                cart.products = [...cart.products, newProduct];
            }
            cart.total+= +price
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.log(err);
            })
        })
    }
}