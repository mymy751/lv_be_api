const express = require('express');
const router = express.Router();
const { getProduct, getABC, getCustomOrder, getAddProduct, postAddProduct, 
    postDeleteProduct, getUpdateProduct, postUpdateProduct, 
    getAddCategory, getCategory, getUser, getCart,
    postAddCategory, postDeleteCategory, getUpdateCategory, postUpdateCategory,
    getCategoryForProduct, getLogin, postLogin,
    getAllProduct } = require('../controllers/adminController');


router.get('/product', getProduct);  

router.get('/abc', getABC);

router.get('/custom-order', getCustomOrder);

router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

router.post('/delete-product', postDeleteProduct); //các đường dẫn '/delete-product','/add-product'này sẽ kêu là endpoint 

router.get('/update-product', getUpdateProduct);

router.post('/update-product', postUpdateProduct);

router.get('/category', getCategory);

router.get('/add-category', getAddCategory);

router.get('/update-category', getUpdateCategory);

router.post('/update-category', postUpdateCategory);

router.post('/add-category', postAddCategory);

router.post('/delete-category', postDeleteCategory);

router.get('/getCategoryForProduct', getCategoryForProduct);

router.get('/user', getUser);

router.get('/cart', getCart)

router.get('/login', getLogin);
router.post('./login', postLogin);

router.get('/api/getAllProduct', getAllProduct);

module.exports = router;
