const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    role: String,
});

const user = mongoose.model('esp_user', userSchema);
module.exports = user;

