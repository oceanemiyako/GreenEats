// On importe Sequelize, qui est un ORM de Node.js, il va nous permettre de créer nos modèles, nos controleurs, les tables dans la BDD et de générer notre CRUD.
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("greeneats2", "root", "12345",  {
    dialect: "mysql",
    host: "localhost",
});

// On importe les différents modèles.
const User = require("../models/user")(sequelize);
const Favorite = require("../models/favorite")(sequelize);
const History = require("../models/history")(sequelize);

// On synchronise la BDD avec nos modèles.
sequelize
    .sync({ force: false })
    .then((_) => console.log("BDD synchronisée."))
    .catch((error) => console.error(`Erreur synchro : ${error}`));

// On exporte les modules qui vont être utilisés dans le reste de l'application.
module.exports = {
    sequelize,
    User,
    Favorite,
    History,
};
