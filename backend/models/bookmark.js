const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Activities: [
        {
            type: Schema.Types.ObjectId, // References another document
            ref: 'Activity' // Refers to the products model
        }
    ],
    Itineraries: [
        {
            type: Schema.Types.ObjectId, // References another document
            ref: 'Itinerary' // Refers to the products model
        }
    ],
    Museums: [
        {
            type: Schema.Types.ObjectId, // References another document
            ref: 'Museum' // Refers to the products model
        }
    ]
}, { timestamps: true });

const bookmark = mongoose.model('bookmark', bookmarkSchema);
module.exports = bookmark;
