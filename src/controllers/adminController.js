
const { request } = require('express');
const {connection} = require('../utils/connection.js');
const {product} = require('../database/database.js');
// const connection = require('../../index.js');

const getProduct = (req, res) => {
    connection.query(`select * from products`, (err, results) => { //Này là câu truy vấn query 
        // console.log(results); //trước khi render thì phải gọi câu truy vấn dữ liệu
        res.render("./product.ejs", {data: results});
    });
    //phải chỉ định đường dẫn trong thư mục view thì nó mới đọc đc file trog ejs
}

const getABC = (req, res) => {
    res.send("mymymym");
};

const getCustomOrder = (req, res) => {
    res.render("./customOrder.ejs");
}

const getAddProduct = (req, res) => {
    res.render("./addProduct.ejs");
};

const getUpdateProduct = (req, res) => {
    const productId = req.query.productId;
    const productName = req.query.productName;
    const productImage = req.query.productImage;
    const productPrice = req.query.productPrice;
    const productStatus = req.query.productStatus

    res.render("./updateProduct.ejs", { 
        productId: productId,
        productName: productName,
        productImage: productImage,
        productPrice: productPrice,
        productStatus: productStatus
    });
};

const getCategory = (req, res) => {
    connection.query(`select * from category`, (err, results) => {
        res.render("./category.ejs", {data: results});
    })
};

const getCategoryForProduct = (req, res) => {
    const query = `
        SELECT * from category
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu', err);
            return;
        }
        const category = results;
        res.json(category);

        console.log('category la:', category);

    });
};

const getAddCategory = (req, res) => {
    res.render('./addCategory.ejs');
};

const getUpdateCategory = (req, res) =>{
    const categoryId = req.query.categoryId;
    const categoryName = req.query.categoryName;


    res.render('./updateCategory.ejs', {
        categoryId: categoryId,
        categoryName: categoryName
    });
};

const getUser = (req, res) => {
    res.render('./user.ejs');
}

const getCart = (req, res) => {
    res.render('./cart.ejs');
};
//Thêm Sản Phẩm
const postAddProduct = (req, res) => {

    const { productName, productPrice, productImage, statusProduct, productDiameter, productHeight, productDescription, productCategory} = req.body; //destructering Object

    console.log('categoryId', productCategory); 

    // Thực hiện thêm sản phẩm vào cơ sở dữ liệu ở đây
    const query = `
        INSERT INTO products (product_name, product_price, product_image, 
            status_product, product_diameter, product_height, product_description, id_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
   
    connection.query(query, [productName, productPrice, productImage, statusProduct, productDiameter, productHeight, productDescription, productCategory], (err, results) => {
        if (err) {
            console.error('Lỗi thêm sản phẩm: ', err);
            return;
        }
    
    res.send(`<script>alert('Đã thêm Sản phẩm ${productName} thành công'); window.location.href = '/product';</script>`);
});
}

//Xóa sản phẩm 
const postDeleteProduct = (req, res) => {
    const {productId} = req.body;

    // console.log("Req.body: ", JSON.parse(req.body));

    if (!productId) {
        res.json({ success: false, message: 'Thiếu thông tin productId.' });
        return;
    }

    // Thực hiện xóa sản phẩm trong cơ sở dữ liệu
    const query = `
        DELETE FROM products
        WHERE id_product = ?
    `;

    // console.log("Query xóa: ",query);
    connection.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi xóa sản phẩm: ', err);
            res.json({ success: false, message: 'Có lỗi xảy ra khi xóa sản phẩm.' });
            return;
        }

        res.json({ message: `Đã Xóa Sản phẩm ${productId} thành công` });
    });
};

//Cập nhật sản phẩm
const postUpdateProduct = (req, res) =>{
    const { productName, productImage, productPrice, statusProduct, productCategory, productId} = req.body;

    //Thực hiện cập nhật sản phẩm trong cơ sở dữ liệu
    console.log('productCategoryyyyy', productCategory);
    
    const query = `
            UPDATE products
            SET product_name = ?, product_image = ?, product_price = ?, status_product = ?, id_category = ?
            WHERE id_product = ?
    `;

    connection.query(query, [productName, productImage, productPrice, statusProduct, productCategory, productId ], (err, results) => {
        if (err) {
            console.error('Lỗi cập nhật sản phẩm: ', err);
            res.json({ success: false, message: 'Có lỗi xảy ra khi cập nhật sản phẩm.' });
            return;
        };
        res.send(`<script>alert('Đã cập nhật Sản phẩm ${productId} thành công'); window.location.href = '/product';</script>`);
    });
};

const postAddCategory = (req, res) => {
    const {categoryName} = req.body;

    const query = `
        INSERT INTO category (category_name)
        Value (?)
    `;
    connection.query(query, [categoryName], (err, result) =>{
        if(err){
            console.error('Lỗi thêm loại sản phẩm' + err);
            return;
        }
        res.send(`<script>alert('Đã thêm loại sản phẩm ${categoryName} thành công'); window.location.href = '/category';</script>`);
    });
}
const postDeleteCategory = (req, res) =>{
    const {categoryId} = req.body;

    if(!categoryId){
        res.json({ success: false, message: "Thiếu thông tin CategoryId"});
        return;
    }

    const query = `
        DELETE FROM category 
        WHERE id_category = ?
    `;

    connection.query(query, [categoryId], (err, result) =>{
        if(err){
            console.log("Lỗi xóa loại sản phẩm", err);
            res.json({ success: false, message: 'Có Lỗi xảy ra khi xóa loại sản phẩm' });
            return;
        }
        res.json({message: `Đã xóa loại sản phẩm ${categoryId} thành công`});
    })

}

const postUpdateCategory = (req, res) => {
    const {categoryName, categoryId} = req.body;

    console.log("Id cate:"+ categoryId);

    const query = `
        UPDATE category 
        SET category_name = ?
        WHERE id_category = ?
    `;
    console.log("Querylf", query);

    connection.query(query, [categoryName, categoryId], (err, results) => {
        if(err){
            console.error("Lỗi cập nhật loại sản phẩm", err);
            res.json({success: false, message: "Có lỗi xảy ra khi cập nhật loại sản phẩm"});
            return;
        }
        res.send(`<script>alert('Đã cập nhật loại sản phẩm ${categoryName} thành công'); window.location.href='/category'; </script>`)
    })
}


const getLogin = (req, res) =>{
    res.render('./login.ejs')
}
const postLogin = (req, res) =>{
    
}


const getAllProduct = (req, res) => {
    connection.query(`select * from products`, (err, results) => { //Này là câu truy vấn query 
        // console.log(results); //trước khi render thì phải gọi câu truy vấn dữ liệu
       // res.render("./product.ejs", {data: results});
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify(results));
    });
    
       
   
}

module.exports = {
    getProduct,
    getABC,
    getCustomOrder,
    getAddProduct,
    postAddProduct,
    postDeleteProduct,
    getUpdateProduct,
    postUpdateProduct,
    getAddCategory,
    getCategory,
    getUser,
    getCart,
    postAddCategory,
    postDeleteCategory,
    getUpdateCategory,
    postUpdateCategory,
    getCategoryForProduct,
    getLogin,
    postLogin,
    getAllProduct
};
