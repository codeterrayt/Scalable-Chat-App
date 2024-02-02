const mongoose = require("./db");

const messageSchema = new mongoose.Schema({
    message: { type: Object, required: true }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;