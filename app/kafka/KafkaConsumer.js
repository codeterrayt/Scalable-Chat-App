const { kafka } = require("./KafkaClient");
const { storeMessages } = require("../db/operation");

module.exports = async function () {
    const consumer = kafka.consumer({groupId:process.env.KAFKA_GROUP_ID});

    console.log("connecting to consumer");
    await consumer.connect();

    await consumer.subscribe({ topics: [process.env.KAFKA_TOPIC], fromBeginning: true })

    console.log("consumer connected successfully")


    let messages_count = 0;
    let messages = [];

    await consumer.run({
        
        eachMessage: async ({ topic, partition, message }) => {
            console.log(JSON.parse(message.value.toString()))

            messages.push(JSON.parse(message.value.toString()));
            messages_count++;
            
            console.log(messages)

            
            if(messages_count == process.env.PROCESS_KAFKA_MESSAGE_LIMIT){
                await storeMessages(messages);
                messages_count = 0;
                messages = [];
            }

        
        },
        
    })
    
}
