
// const mysql = require('mysql2');
// //Kết nối cơ sở dữ liệu DB
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user:  'root',
//     password: '',
//     database: 'db-app-lv-nodejs',
// });


// // connection.connect((err,) =>{
// //     if(err){
// //         console.log('Error connecting');
// //     }
// //     else{
// //         console.log('Connect success'); 
// //     }
// // });

// module.exports = {
//     connection,
// };

//kho chứa nguyên liệu 

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id_user INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255),
        user_email VARCHAR(255),
        user_address VARCHAR(255),
        user_phone VARCHAR(255),
        role VARCHAR(255) NOT NULL default 'user'
    );
`;

const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
       id_product INT AUTO_INCREMENT PRIMARY KEY,
       product_name VARCHAR(255),
       product_image VARCHAR(255),
       product_price DECIMAL(10, 3),
       product_category VARCHAR(255),
       product_diameter FLOAT,
       product_height FLOAT,
       product_description VARCHAR(255),
       status_product VARCHAR(255),

       id_category INT,
       FOREIGN KEY (id_category) REFERENCES categories (id_category)
    );
`;

const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
       id_order INT AUTO_INCREMENT PRIMARY KEY,
       status VARCHAR(255),
       id_user INT,
       FOREIGN KEY (id_user) REFERENCES users (id_user)
    );
`;

const createDetailOrdersTable = `
    CREATE TABLE IF NOT EXISTS detailorders (
       id_detailorder INT AUTO_INCREMENT PRIMARY KEY,
       quantity INT,
       total_amount DECIMAL (10, 3),
       id_order INT,
       FOREIGN KEY (id_order) REFERENCES orders (id_order),
       id_product INT,
       FOREIGN KEY (id_product) REFERENCES products (id_product)
    );
`;
const createCategoryTable = `
    CREATE TABLE IF NOT EXISTS category (
       id_category INT AUTO_INCREMENT PRIMARY KEY,
       category_name VARCHAR(255)
    );
`;

const createCustomOrder =`
    CREATE TABLE IF NOT EXISTS customorder (
        id_custom INTEGER PRIMARY KEY AUTO_INCREMENT,
        information TEXT,
        height float,
        diameter float,
        email varchar(255),
        address varchar(255),
        phone varchar(255),
        id_product INTEGER,
        FOREIGN KEY (id_product) REFERENCES products(id_product)
    );
`;


module.exports = {
    createUsersTable,
    createProductsTable,
    createOrdersTable,
    createDetailOrdersTable,
    createCategoryTable,
    createCustomOrder
};
