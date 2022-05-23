const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({

    id: String,
    name: String,
    email: String,
    phone: String,
    address:String,
    birthday: String,
    username: String,
    password: String,
    checkcode:String,
    checkresult:Boolean

});

module.exports = mongoose.model('mod', memberSchema);