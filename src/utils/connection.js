const mysql = require('mysql2');
//Kết nối cơ sở dữ liệu DB
const connection = mysql.createConnection({
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'db-app-lv-nodejs',
});

// connection.connect((err,) =>{
//     if(err){
//         console.log('Error connecting');
//     }
//     else{
//         console.log('Connect success'); 
//     }
// });

module.exports = {
    connection,
};
