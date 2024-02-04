var cron = require('node-cron');
const Message = require("../db/schema");
const { updateMessagesInRedis } = require("../redis/redis")

cron.schedule('* 1 * * * *', async () => {

    try {
        console.log('Running a task every minute');

        // Fetch data from MongoDB
        const messagesFromMongoDB = await Message.find({});

        // Update Redis with the fetched data
        await updateMessagesInRedis(messagesFromMongoDB);

        console.log('Data synchronized to Redis successfully');
    } catch (error) {
        console.error('Error synchronizing data to Redis:', error);
    }

});