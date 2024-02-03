require('dotenv').config();


const express = require("express");
const app = express();
const path = require("path");
const router = require("./app/routes/route")

const { createServer } = require("./app/socket/socket")


// set the view engine to ejs
app.set('view engine', 'ejs');

// app.use(express.static(path.resolve("./public")));

app.use('/',router);

createServer(app);


