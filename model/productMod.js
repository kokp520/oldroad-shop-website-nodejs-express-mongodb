const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: String,
    productclass: String,
    color: Array,
    size: Array,
    price: Number,
    description: String,
    image: Array,
});

module.exports = mongoose.model('products', productSchema);
