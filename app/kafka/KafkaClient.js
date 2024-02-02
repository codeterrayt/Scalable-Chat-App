require('dotenv').config();

const {Kafka} = require('kafkajs');

exports.kafka = new Kafka({
    clientId: process.env.KAFKA_GROUP_ID,
    brokers:[process.env.KAFKA_BROKERS],
});