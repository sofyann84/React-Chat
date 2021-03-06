var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema(
    {
        chatId: Number,
        name: String,
        message: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Chat', chatSchema);