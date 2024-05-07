const axios = require('axios');
const connection = require('./config/db');

const API_URL = 'https://world.openfoodfacts.org/api/v0/product/';

const getProductDetails = async (ean) => {
    try {
        const response = await axios.get(API_URL + ean + '.json');

        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            console.error("La réponse de l'API n'est pas valide pour le code EAN :", ean);
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du produit pour le code EAN", ean, ":", error.message);
        return null;
    }
};

const insertProductIntoDB = async (productDetails) => {
    try {
        const {
            code,
            product_name: common_name,
            brands,
            categories,
            labels,
            quantity,
            nutriments,
            additives_tags,
            environment_impact_level_tags
        } = productDetails;

        let truncatedNutrition = '';
        if (nutriments) {
            truncatedNutrition = JSON.stringify(nutriments).substring(0, 250);
        }

        const insertQuery = `INSERT INTO product 
            (barcode, common_name, brands, categories, labels, quantity, nutrition, additives, environment) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            code,
            common_name || '',
            Array.isArray(brands) ? brands.join(', ') : '',
            Array.isArray(categories) ? categories.join(', ') : '',
            Array.isArray(labels) ? labels.join(', ') : '',
            quantity || '',
            truncatedNutrition,
            JSON.stringify(additives_tags),
            JSON.stringify(environment_impact_level_tags)
        ];

        await new Promise((resolve, reject) => {
            connection.query(insertQuery, values, (error, results) => {
                if (error) {
                    console.error("Erreur lors de l'insertion du produit dans la base de données :", error);
                    reject(error);
                } else {
                    console.log("Produit inséré avec succès dans la base de données !");
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'insertion du produit dans la base de données :", error.message);
        throw error;
    }
};

const insertProductsIntoDB = async (eanList) => {
    for (const ean of eanList) {
        const productDetails = await getProductDetails(ean);
        if (productDetails) {
            await insertProductIntoDB(productDetails);
        }
    }
};

const eanList = ['3168930009078', '1234567890123', '9876543210987']; 
