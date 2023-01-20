const Product = require('../models/product');
const cart = require('../models/cart');

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

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = async (req,res,next)=>{
  try{
    const prodId = req.body.productId;
    const data = await Product.findByPk(prodId);
    cart.addProduct(prodId, data[0].price)
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
