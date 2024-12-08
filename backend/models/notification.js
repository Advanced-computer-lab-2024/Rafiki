const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    username: { type: String, required: true },
    activityId: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
    isNotified: { type: Boolean, default: false }, // Whether the notification was sent
});

module.exports = mongoose.model('Notification', notificationSchema);