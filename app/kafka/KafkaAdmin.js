const { kafka } = require("./KafkaClient"); 

module.exports = async function(){
    const admin = kafka.admin();
    console.log("admin connecting");
    admin.connect();
    console.log("admin connected successfully");

    console.log("Creating topic..")
    await admin.createTopics({
        topics:[{
            topic:process.env.KAFKA_TOPIC,
            numPartitions:process.env.KAFKA_NO_OF_PARTITIONS
        }] 
    });
    console.log("Topic Created Successfully");
    console.log("Disconnecting Admin..");

    await admin.disconnect();

}

