const Message = require("./schema");


async function storeMessages(messages) {
    try {
        const insertedMessages = await Message.insertMany(messages);
        console.log(`${insertedMessages.length} messages inserted successfully.`);
        console.log(messages)
    } catch (error) {
        console.error('Error saving messages:', error.message);
        console.log(messages)
    }
}

async function fetchAllMessages() {
    let msg = await Message.find().sort({ createdAt: -1 }).limit(20).exec((err, records) => {
        if (err) {
            console.error(err);
            // Handle the error appropriately
        } else {
            console.log(records);
            // Process the fetched records
        }
    });
    return msg;
}

module.exports = {
    storeMessages,
    fetchAllMessages
}