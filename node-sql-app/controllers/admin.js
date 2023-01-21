const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = async(req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  await req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  })
  res.redirect('/');
};

exports.getProducts = async(req, res, next) => {
  try{
  const data = await req.user.getProducts()
    res.render('admin/products', {
      prods: data,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }catch(err){
    console.log(err);
  }
};

exports.getEditProduct = async(req, res, next) => {
  try{
    const prodId = req.params.productId;
    const data= await req.user.getProducts({where: {id:prodId}});
      if(!data){
        res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: data[0]
      });
  
  }catch(err){
    console.log(err);
  }
};

exports.postEditProduct = async (req, res, next) => {
    try{
      const prodId = req.body.productId;
      const data = await Product.findByPk(prodId);
      data.title = req.body.title,
      data.price = req.body.price
      data.imageUrl = req.body.imageUrl,
      data.description = req.body.description,
      await data.save();
      res.redirect('/admin/products');
    }catch(err){
      console.log(err);
    }
}

exports.postDeleteProduct = async(req, res, next) => {
  try{
    const prodId = req.body.productId;
    const data = await Product.findByPk(prodId);
    await data.destroy();
    res.redirect('/admin/products');
  }catch(err){
    console.log(err)
  }
}

