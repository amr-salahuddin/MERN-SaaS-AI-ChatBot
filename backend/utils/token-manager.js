const jwt = require("jsonwebtoken");
const AppError = require("./appError");


exports.generateToken = (id) => {
    const token = jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token
}


exports.verifyToken = function (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('hi');
    console.log(decoded)
    if (!decoded) return false;
    //check expiry
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) return false;
    return true;
}
