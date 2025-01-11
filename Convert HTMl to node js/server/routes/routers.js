const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const contactController = require('../controllers/contact.controller');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', contactController.getContact);
router.post('/contact', contactController.postContact);

router.get('/products', productController.getProducts);

module.exports = router;
