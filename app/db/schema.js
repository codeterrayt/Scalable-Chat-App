const mongoose = require("./db");

const messageSchema = new mongoose.Schema({
    socket_id: { type: String },
    message: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id; // Exclude the _id field
        }
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;