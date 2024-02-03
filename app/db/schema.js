const mongoose = require("./db");

const messageSchema = new mongoose.Schema({
    message: { type: Object, required: true },
    createdAt: {type: Date, default: Date.now}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;