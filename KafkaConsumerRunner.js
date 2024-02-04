require('dotenv').config();

const kafka = require("./app/kafka/KafkaConsumer");
const admin = require("./app/kafka/KafkaAdmin");

(async ()=>{
    await admin();
    await kafka();
})();