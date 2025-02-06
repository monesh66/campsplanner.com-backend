const jwt = require('jsonwebtoken');

const jwtSecretKey = "VeRy StRoNg KeY 934570";


const verifyAuth = async (req, res,) => {
    console.log("verifing user...")
    try {
        const { JWT } = req.body;
        if (JWT) {
            const content = jwt.decode(JWT, jwtSecretKey);
            if (content.exp < Math.floor(Date.now() / 1000)) {
                console.log("Token Expired");
                res.send({
                    auth: false,
                    msg: "Token expired. Login again !"
                })
            }
            else {
                console.log("verified success. username: ", content['username']);
                res.send({
                    username: content['username'],
                    userType: content.userType,
                    auth: true
                })
            }
        }
        else {
            console.log("Token Not Found.");

            return res.send({
                auth: false,
                msg: "Token Not Found"
            })
        }
    }
    catch (err) {
        console.log("Error while verification.");
        res.send({
            auth: false,
            error: 1,
            msg: "some thing went wrong",
            err: err
        })
    }
}

const verifyAuthApi = async (req, res, next) => {
    try {
        const { JWT } = req.body;
        if (JWT) {
            const content = jwt.decode(JWT, jwtSecretKey);
            if (content.exp < Math.floor(Date.now() / 1000)) {
                console.log("API Verification Failed : Token Expired");
                res.send({
                    auth: false,
                    msg: "Token expired"
                })
            }
            else {
                console.log(`API Verification Success: ${content.username}`);
                req.username = content.username;
                next();
            }
        }
        else {
            console.log("API Verification Failed : Token Not Found");
            return res.send({
                auth: false,
                msg: "Token Not Found"
            })
        }
    }
    catch (err) {
        console.log("API Verification Failed : Error while verification.");
        console.log(err)
        res.send({
            auth: false,
            error: 1,
            msg: "some thing went wrong",
            err: err
        })
    }
}

module.exports = { verifyAuth, verifyAuthApi };