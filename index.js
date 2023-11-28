// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Welcome hello world!');
// });

// app.listen(port, () => {
//     console.log('Server running at port ${port}/');
// });


const express = require('express');

const webRouter = require('./src/routes/route.js');
const path = require('path');
const {connection} = require('./src/utils/connection.js');

const {
    createUsersTable, 
    createProductsTable,
    createOrdersTable,
    createDetailOrdersTable,
    createCategoryTable,} = require('./src/database/database.js');

const app = express();
const port = 4000;



connection.query(createCategoryTable, (err, results) =>{ //này là để kiểm tra đã tạo đc bảng chưa
    if(err){
        console.log('Error creating users table', err);
    }else{
        console.log('Successfully created users table');
    }
});

app.use(express.json()); //body parser

app.use(express.urlencoded({ extended: true }));


app.set('views', path.join('./src', 'views'));
app.set('view engine', 'ejs ');


app.use(express.static(path.join('./src','public')));

app.use('/', webRouter);



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


// module.exports = {
//     connection,
// };
