const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const Tag = mongoose.model('Tag', userSchema);

module.exports = Tag;
