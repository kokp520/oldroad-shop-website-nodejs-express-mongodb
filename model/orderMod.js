const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    title: String,
    productclass: String,
    color: String,
    size: String,
    price: Number,
    quantity: Number,
    mainimg: Array,
    user: String,
});

module.exports = mongoose.model('orders', orderSchema);
