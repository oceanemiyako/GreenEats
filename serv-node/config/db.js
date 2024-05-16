const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("greeneats", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

const User = require("../models/user")(sequelize);
const Favorite = require("../models/favorite")(sequelize);
const History = require("../models/history")(sequelize);

sequelize
    .sync({ force: false })
    .then((_) => console.log("BDD synchronisée."))
    .catch((error) => console.error(`Erreur synchro : ${error}`));

module.exports = {
    sequelize,
    User,
    Favorite,
    History,
};
