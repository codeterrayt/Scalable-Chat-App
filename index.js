const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const redis = require('ioredis');
const initStoreKafka = require("./app/kafka/KafkaProducer");
const express = require("express");


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const redisChannel = "redis-message-channel"
const redisClient = redis.createClient();
const redisPub = new redis();



redisClient.on("connect", function () {
    console.log(`connected to redis`);
    isRedis = true;
});

redisClient.on("error", function (err) {
    console.log("redis connection error " + err);
    throw err;
});

redisClient.on("end", function (err) {
    console.log("redis connection end " + err);
});



redisClient.subscribe(redisChannel,(err,count)=>{
    if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        console.error("Failed to subscribe: %s", err.message);
      } else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
      }
})

// Socket.io
io.on("connection", (socket) => {

    console.log("new user is connected", socket.id)
    redisPub.publish(redisChannel, JSON.stringify({message:`${socket.id} Connected`}));

    socket.on('chat message', async (data) => {
        let message = JSON.stringify({message:data});
        redisPub.publish(redisChannel, message);
        await initStoreKafka(message);
    });


    socket.on("disconnect", data => {
        redisPub.publish(redisChannel, JSON.stringify({message:`${socket.id} Disconnected`}));
    })


});


redisClient.on("message",(channel,message)=>{
    io.emit('chat message',JSON.parse(message).message);
})

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.render("index");
});

server.listen(8000, () => console.log(`Server Started at PORT:8000`));