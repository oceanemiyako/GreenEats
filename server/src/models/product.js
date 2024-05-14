const connection = require('../../config/db');

const Product = {
    getAllProducts: (callback) => {
        connection.query("SELECT * FROM product", callback);
    },
    getProductByUsername: (username, callback) => {
        const query = "SELECT common_name, brands, categories, labels, quantity, nutrition, additives, environment FROM product WHERE username = ?";
        connection.query(query, [username], callback);
    },
};

module.exports = Product;
