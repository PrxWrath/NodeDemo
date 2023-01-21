const Product = require('../models/product');

exports.getProducts = async(req, res, next) => {
    try{
      const data = await Product.findAll()
      res.render('shop/product-list', {
        prods: data,
        pageTitle: 'All Products',
        path: '/products'
      });
    }catch(err){
      console.log(err);
    }
};

exports.getProduct = async (req, res, next) => {
  try{
  const prodId = req.params.productId;
  const data = await Product.findByPk(prodId);
    res.render('shop/product-detail', {
      product: data,
      pageTitle: data.title,
      path: '/products'
    });
  }catch(err){
    console.log(err);
  }
};

exports.getIndex = async(req, res, next) => {
  try{
    const data = await Product.findAll()
    res.render('shop/index', {
      prods: data,
      pageTitle: 'Shop',
      path: '/shop'
    });
  }catch(err){
    console.log(err);
  }
};

exports.getCart = async(req, res, next) => {
  try{
    const cart = await req.user.getCart()
    const data = await cart.getProducts()
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: data
    });
  }catch(err){
    console.log(err);
  }
};

exports.postCart = async (req,res,next)=>{
  try{
    const prodId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({where: {id: prodId}});
    const data = await Product.findByPk(prodId);
    let qty = 1;
    if(products[0]){
      prev = products[0].cartItems.quantity
      qty = prev+1;
    }
    await cart.addProduct(data, {through: {quantity: qty}});
    res.redirect('/cart');
  }catch(err){
    console.log(err)
  }
}

exports.postDeleteCart = async (req,res,next)=>{
  try{
    const prodId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({where: {id: prodId}});
    if(products[0]){
      await products[0].cartItems.destroy();
    }
    res.redirect('/cart');
  }catch(err){
    console.log(err)
  } 
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
