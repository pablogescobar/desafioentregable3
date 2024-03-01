const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
    try {
        const existingProducts = await productManager.getProducts();
        const { limit } = req.query;
        if (!limit) {
            res.json(existingProducts);
        } else {
            const parsedLimit = parseInt(limit);
            if (!isNaN(parsedLimit) && parsedLimit > 0) {
                const limitedProducts = existingProducts.slice(0, parsedLimit);
                res.json(limitedProducts);
            } else {
                res.status(400).json({ error: 'Error: El parámetro limit debe ser un número positivo' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener producto por ID" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
