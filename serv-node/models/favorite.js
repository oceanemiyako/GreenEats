const { DataTypes } = require("sequelize");

// Création du modèle 'Favorite' en utilisant la méthode 'define'. On utilise les Datatypes fournit par Sequelize pour créer le modèle. A noter qu'il est possible de faire la même chose en utilisant des queries.
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
