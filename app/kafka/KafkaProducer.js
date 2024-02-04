const { kafka } = require("./KafkaClient"); 


module.exports = async function (message){
    const producer = kafka.producer();

    console.log("connecting to producer");
    await producer.connect();

    console.log("producer connected successfully")

    await producer.send({
        topic:process.env.KAFKA_TOPIC,
        messages:[
            { key:"message-update", value: message }
        ]
    })

}
