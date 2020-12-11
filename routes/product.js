var express = require('express');
let Product = require('../model/product');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let products=await Product.find();
  console.log(products);
  res.render('productview',{title:'Edurako Course List',products});
});



router.get('/add', async function(req, res, next) {
 
  res.render('add');
});
router.post('/add', async function(req, res, next) {
 // product.Prouductname=req.body.Prouductname  when we write different names then use this
  let product=new Product(req.body);
  await product.save();
  res.redirect('/product');
});
router.get('/delete/:id', async function(req, res, next) {

  let product =await Product.findByIdAndDelete(req.params.id);
  res.redirect('/product');
   
 });
 router.get('/Edit/:id', async function(req, res, next) {

  let product =await Product.findById(req.params.id);
 res.render('edit',{product});
 
   
 });
 router.post('/Edit/:id', async function(req, res, next) {
 
  let product =await Product.findByIdAndUpdate(req.params.id,req.body);  //1st way is name is same
  // product.Prouductname=req.body.Prouductname;
  // product.Quantity=req.body.Quantity;    //2nd way to do this
  // product.Price=req.body.Price;
  await product.save();
  res.redirect('/product');

 
   
 });
 
module.exports = router;
