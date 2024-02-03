const initStoreKafka = require("../kafka/KafkaProducer");
const { Server } = require("socket.io");
const redis = require('ioredis');
const http = require("http");
const redisChannel = process.env.REDIS_CHANNEL
const redisClient = redis.createClient();
const redisPub = new redis();
const redisNor = new redis();

let io;
let server;
const createServer = async (app) => {
    server = http.createServer(app);
    io = new Server(server);
    await init();
}

const init = async () => {

    redisClient.on("connect", function () {
        console.log(`connected to redis`);
    });

    redisClient.on("error", function (err) {
        console.log("redis connection error " + err);
        throw err;
    });

    redisClient.on("end", function (err) {
        console.log("redis connection end " + err);
    });



    redisClient.subscribe(redisChannel, (err, count) => {
        if (err) {
            console.error("Failed to subscribe: %s", err.message);
        } else {
            console.log(
                `Subscribed successfully! This client is currently subscribed to ${count} channels.`
            );
        }
    })

    const pushMessage = async data => {
        let message = JSON.stringify({ message: data });
        redisPub.publish(redisChannel, message);
        await redisNor.rpush("messages", message);
        await initStoreKafka(message);
    }

    // Socket.io
    io.on("connection", (socket) => {

        console.log("new user is connected", socket.id)
        pushMessage(`${socket.id} Joined the Chat!`);
        

        socket.on('chat message', async (data) => {
            pushMessage(data);
        });


        socket.on("disconnect", data => {
            pushMessage(`${socket.id} Left the Chat!`);
        })


    });


    redisClient.on("message", (channel, message) => {
        io.emit('chat message', JSON.parse(message).message);
    })

    server.listen(process.env.WEB_APP_PORT, () => console.log(`Server Started at PORT:${process.env.WEB_APP_PORT}`));

};

module.exports = { createServer }