// list dependencies
var express = require('express');
var router = express.Router();

// add db & model dependencies
var mongoose = require('mongoose');
var Product = require('../models/product');

// interpret GET /products - show product listing */
router.get('/api/v1/getProducts',function (req, res, next) {

    // retrieve all products using the product model; returns either an error or list of products
    Product.find(function (err, products) {
        // if we have an error
        if (err) {
            res.send(err);
            
        }
        else {
          
            res.send({products: products});
            console.log(products);
        }
    });
});
// /api/v1/getProduct?id=<id of product></id>
// GET intepret GET /products/edit/:id - show single product edit form */
router.get('/api/v1/getProduct/:id', function (req, res, next) {
    //store the id from the url in a variable
    var id = req.params.id;

    //use the product model to look up the product with this id    
    Product.findById(id, function (err, product) {
        if (err) {
            res.send('Product ' + id + ' not found');
        }
        else {
            res.send({ product: product });
           
        }
    });
});

// POST /products/edit/:id - update selected product */
router.post('/api/v1/updateProduct:id', function (req, res, next) {
    var id = req.body.id;

    var product = {
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    };

    Product.update({ _id: id}, product, function(err) {
        if (err) {
            res.send('Product ' + req.body.id + ' not updated. Error: ' + err);
        }
        else {
            res.statusCode = 302;
           // res.setHeader('Location', 'http://' + req.headers['host'] + '/products');
            res.end();
        }
    });
});

// GET /products/add - show product input form
router.get('/products/add', function (req, res, next) {
      res.send({products: products});
});

// POST /products/add - save new product
router.post('/api/v1/addProduct', function (req, res, next) {

    // use the Product model to insert a new product
    Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }, function (err, Product) {
        if (err) {
            console.log(err);
            res.send({error: err });
           
        }
        else {
            console.log('Product saved ' + Product);
            //res.render('added', { product: Product.title });
            res.send({ product: Product.title });
        }
    });
});

// API GET products request handler
router.get('/api/products', function (req, res, next) {
    Product.find(function (err, products) {
        if (err) {
            res.send(err);
        } 
        else {
            res.send(products);
        }
    });
});
  


// make controller public
module.exports = router;
