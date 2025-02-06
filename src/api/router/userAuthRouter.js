const express = require('express');
const userAuthController = require('../controller/userAuthController');
const {verifyAuth, verifyAuthApi} = require('../middleware/jwtVerify');

const route = express.Router();


route.post("/login" , userAuthController);
route.post("/verify" , verifyAuth);


module.exports = route;