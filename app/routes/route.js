const express = require('express');
const router = express.Router();
const { init } = require("../socket/socket") 


router.get("/", async (req, res) => {
    return res.render("index");
});


module.exports = router;