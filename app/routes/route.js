const express = require('express');
const router = express.Router();
const redis = require('ioredis');
const redisNor = new redis();
const Message = require("../db/schema")

const fetchMessagesFromRedis = async ()=>{
    return await redisNor.lrange("messages",0,-1)
} 


router.get("/", async (req, res) => {
    
    let msg = await fetchMessagesFromRedis();
    let message = msg? msg : [];
    // console.log(message)

    let first_message = [];

    if(message.length !== 0){
        first_message = JSON.parse(message[0]);
        message.pop();
        console.log(first_message)

        // let msg = await Message.$where({$lte: first_message.createdAt});
        // console.log(msg)

    }

    

    return res.render("index", {
        message, first_message
    });
});


module.exports = router;