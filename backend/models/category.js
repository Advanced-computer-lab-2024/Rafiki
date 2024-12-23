const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const category = mongoose.model('category', userSchema);

module.exports = category;
