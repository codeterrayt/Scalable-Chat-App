require('dotenv').config();
const mongoose = require('mongoose');

(async ()=>{
    console.log("connecting to mongodb")
    await mongoose.connect(process.env.MONGO_CONNECT_STRING);

    console.log("mongo db conneted successfully!")
})();

module.exports = mongoose;