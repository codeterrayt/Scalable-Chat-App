const { kafka } = require("./KafkaClient"); 

module.exports = async function(){
    const admin = kafka.admin();
    console.log("admin connecting");
    admin.connect();
    console.log("admin connected successfully");

    console.log("Creating topic..")
    await admin.createTopics({
        topics:[{
            topic:"chat-updates",
            numPartitions:1
        }] 
    });
    console.log("Topic Created Successfully");
    console.log("Disconnecting Admin..");

    await admin.disconnect();

}

