var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
});

function products() {
    var query = "Select * from products"
    connection.query(query, function (err, data) {
        if (err) {
            throw err;
        }
        data.forEach(function (row) {
            console.log(`${row.item_id}: ${row.product_name} - ${row.price}`);
        });
        buy();

    });
};

function buy() {

    inquirer.prompt([

        {
            type: "input",
            message: "What is the id of the item you would like to order?",
            name: "id"
        },

        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "quantity"
        }
    ]).then(function (answer) {
        var itemID = answer.id;
        var itemQuantity = answer.quantity
        var querySelect = `select * from products where item_id = ${itemID}`

        connection.query(querySelect, function (err, res) {
            if (res[0].stock_quantity >= itemQuantity) {
                connection.query(`update products set stock_quantity = stock_quantity - ${itemQuantity} where item_id = ${itemID}`)
                console.log("Thank you for ordering from Bamazon! Your total is $" + res[0].price * itemQuantity)
            } else {
                console.log("Sorry, but there is not enough in stock to complete your order")
            }
        });

    });
};

products();
