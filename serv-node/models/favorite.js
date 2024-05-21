const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Favorite = sequelize.define("Favorite", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        barcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Favorite;
};
