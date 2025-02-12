const { adminUserModel } = require('../model/userAuthModel');
const jwt = require('jsonwebtoken');

const jwtSecretKey = "VeRy StRoNg KeY 934570";
const maxAge = 60 * 60

function createToken(username, userType) {
    return jwt.sign({ username: username, userType: userType }, jwtSecretKey, { expiresIn: maxAge })
}

const userLogin = async (req, res) => {

    try {
        const { loginType } = req.body;
        console.log(`Request from IP:${req.ip}`);
        console.log(`Request from IP:${req.connection.remoteAddress}`);
        console.log(`Request from IP:${req.socket.remoteAddress}`);
        console.log(`Request from IP:${req.connection.socket.remoteAddress}`);

        console.log(`Body:`);
        console.log(req.body);

        if (loginType == "oAuth") {
            const { email } = req.body;

            const DBresult = await adminUserModel.findOne({ email: email })
            if (DBresult == null) {
                console.log(`Login Type: ${loginType}`);
                console.log(`${email} not found in DB.`)
                return res.send({
                    msg: "Email Not Found!",
                    code: 0
                })
            }
            else {
                console.log(`Login Type: ${loginType}`);
                console.log(`${email} found in DB.`)
                return res.send({
                    jwt: createToken(email, DBresult.userType),
                    msg: "Email is valid",
                    code: 1
                })
            }
        }
        else {
            const { username, password } = req.body;

            if (username == "demo" && password == "123123123,Cam.") {
                const token = createToken(username, "demo");
                console.log(`Login Type: DEMO`);
                return res.send({
                    jwt: token,
                    msg: "login successfull",
                    code: 1
                })
            }
            else {
                const DBresult = await adminUserModel.findOne({ username: username });

                if (DBresult == null) {
                    console.log(`Login Type: ${loginType}`);
                    return res.send({
                        msg: "username not found!",
                        code: 0
                    })
                }
                else if (DBresult['password'] == password) {

                    const token = createToken(username, DBresult.userType);
                    console.log(`Login Type: ${loginType}`);
                    return res.send({
                        jwt: token,
                        msg: "login successfull",
                        code: 1
                    })
                } else {
                    console.log(`Login Type: ${loginType}`);
                    return res.send({
                        msg: "username or password is wrong",
                        code: 0
                    })
                };
            }
        }
    } catch (error) {
        console.log(error)
        return res.send({
            msg: "Some Thing Went Wrong...",
            error: error,
            code: -1
        })
    }

}


//exports
module.exports = userLogin;
