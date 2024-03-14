CREATE TABLE IF NOT EXISTS product (
id INT AUTO_INCREMENT PRIMARY KEY,
    barcode VARCHAR(20) NOT NULL,
    common_name VARCHAR(255),
    brands VARCHAR(255),
    categories VARCHAR(255),
    labels VARCHAR(255),
    quantity VARCHAR(50),
    nutrition VARCHAR(250),
    additives VARCHAR(255),
    environment VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(250),
    statut VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS favory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    product_name VARCHAR(250),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
	search_term VARCHAR(255),
    dateSearch TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product(id)
);







