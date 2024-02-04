require('dotenv').config();


const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const router = require("./app/routes/route")

const { createServer } = require("./app/socket/socket")

// Configure cors to allow only requests from port 8888
const corsOptions = {
    origin: JSON.parse(process.env.WEB_API_ALLOWED_ORIGIN),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// set the view engine to ejs
app.set('view engine', 'ejs');

// app.use(express.static(path.resolve("./public")));

app.use('/', router);

createServer(app);


