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
  const product = new Product(null, title, imageUrl, description, price);
  await product.save();
  res.redirect('/');
};

exports.getProducts = async(req, res, next) => {
  try{
  const data = await Product.fetchAll()
    res.render('admin/products', {
      prods: data[0],
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
    const data= await Product.findById(prodId);
      if(!data[0]){
        res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: data[0][0]
      });
  
}catch(err){
  console.log(err);
}
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  let updated = new Product(
    prodId,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  )
  await updated.updateExisting();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = async(req, res, next) => {
  try{
    const prodId = req.body.productId;
    await Product.deleteProductById(prodId);
    res.redirect('/admin/products');
  }catch(err){
    console.log(err)
  }
}

