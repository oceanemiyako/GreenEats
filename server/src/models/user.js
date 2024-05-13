const connection = require('../../config/db')


const User = {
    getAllUsers: (callback) => {
        connection.query("SELECT * FROM users", callback);
    },
    addUser: (newUser, callback) => {
        connection.query("INSERT INTO users SET ?", newUser, callback);
    },
    updateUser: (id, modifiedUser, callback) => {
        connection.query("UPDATE users SET ? WHERE id = ?", [modifiedUser, id], callback);
    },
    deleteUser: (id, callback) => {
        connection.query("DELETE FROM users WHERE id = ?", id, callback);
    }
};

module.exports = User;