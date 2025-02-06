const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()

// router import
const userAuthRouter = require('./api/router/userAuthRouter')

const server = express();


// server config
server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin: '*', //'http://localhost:3000'
    methods: ["POST", "GET"],
    credentials: true
}));

const DB_URL = "mongodb://127.0.0.1:27017/csp";
//database connect
const connectDB = async()=>{
    try{
        console.log("Connecting to MongoDB...");
        setTimeout(()=>{
            mongoose.connect(process.env.MONGODB);
            console.log("MongoDB Connection Success.");
        },1000);
    }
    catch (error) {
        console.log("MongoDB Connection Failed.");
        console.log("Error: "+error);
    }
}


// api
server.use("/api/v1/auth", userAuthRouter);
server.get("/test", (req, res)=>{
    console.log(`Request IP:${req.ip}`);    
    res.send(`Project: Campus Schedule Planner ip:${req.ip}`);
});




//run server
server.listen(8090, ()=>{
    console.log("Express Server is Runing on Port 8090.");
    connectDB();
})
