const mongoose = require('mongoose');
const checkoutSchema = new mongoose.Schema({
    userid: String,
    RecipientName: String,
    RecipientPhone: String,
    RecipientAddress: String,
    PS: String,
    payment: String,
    orders: Array,
    cargo: String,
    cargodate: { type: String, date: Date.now },
    total: Number,
});

module.exports = mongoose.model('checkouts', checkoutSchema);
