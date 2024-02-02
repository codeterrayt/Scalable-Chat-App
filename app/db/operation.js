const Message = require("./schema");


module.exports = async function storeMessage(messages){
    try {
        const insertedMessages = await Message.insertMany(messages);
        console.log(`${insertedMessages.length} messages inserted successfully.`);
        console.log(messages)
    } catch (error) {
        console.error('Error saving messages:', error.message);
        console.log(messages)
    }
}

