const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const productsSchema = Schema({
    product: { type: String, required: true },
    id: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    user: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

const Products = mongoose.model('products', productsSchema);

module.exports = Products;