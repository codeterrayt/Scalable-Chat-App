const express = require('express');
const router = express.Router();
const { fetchMessagesFromRedis } = require("../redis/redis")

router.get("/get_messages", async (req, res) => {
    let msg = await fetchMessagesFromRedis();
    res.json(msg);
});

router.get("/", async (req, res) => {
    return res.json({ status: true });
});


module.exports = router;