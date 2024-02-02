require('dotenv').config();

const { kafka } = require("./KafkaClient");
const { storeMessages } = require("../db/operation");

module.exports = async function () {
    const consumer = kafka.consumer({groupId:process.env.KAFKA_GROUP_ID});

    console.log("connecting to consumer");
    await consumer.connect();

    await consumer.subscribe({ topics: ["chat-updates"], fromBeginning: true })

    console.log("consumer connected successfully")


    let messages_count = 0;
    let messages = [];

    await consumer.run({
        
        eachMessage: async ({ topic, partition, message }) => {
            console.log(JSON.parse(message.value.toString()))

            messages.push(JSON.parse(message.value.toString()));
            messages_count++;
            
            console.log(messages)

            
            if(messages_count == 5){
                await storeMessages(messages);
                messages_count = 0;
                messages = [];
            }

        
        },
        
    })
    
}
