const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al obtener los productos:", error.message);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === id);
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error.message);
            throw error;
        }
    }
}

module.exports = ProductManager;
