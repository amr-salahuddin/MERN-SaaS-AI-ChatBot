const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken, verifyToken} = require("../utils/token-manager");


exports.protect = catchAsync(async (req, res, next) => {

    if(!req.headers.authorization){
        return next(new AppError("No token provided", 400));
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log('hi');
    if (!token) {
        return next(new AppError("No token provided", 400));
    }
    if (!verifyToken(token)) {
        return next(new AppError("Invalid token", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id);
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    console.log(decoded)
    req.user =user;

    next();
})
exports.checkToken = catchAsync(async (req, res, next) => {
    //return no content 204

    res.json({
        message: "OK",
        data: {
            user:req.user
        }
    })
})
exports.login = catchAsync(async (req, res, next) => {
    const {email, username, password} = req.body;

    //add password
    //find with either email or username
    const user = await User.findOne({$or: [{email}, {username}]}, "+password -chats");

    if (!user) {
        return next(new AppError("User not found", 404));
    }
    console.log('usar',user);

    const isMatch = await user.comparePassword(password);
    user.password = undefined;

    if (isMatch) {
        //sign jwt
        const token = generateToken(user._id);

        res.json({
            message: "OK",
            data: {
                token,
                user
            }
        })
    } else {
        return next(new AppError("Wrong password", 400));
    }


})

exports.register = catchAsync(async (req, res, next) => {
    const {email, name,username, password, passwordConfirm} = req.body;
    console.log(req.body)
    const exists = await User.findOne({$or: [{email}, {username}]});
    if (exists) {
        return next(new AppError("User already exists", 400))
    }

    const user = new User({
        email,
        name,
        username,
        password,
        passwordConfirm
    })

    await user.save();

    //sign jwt
    const token = generateToken(user._id);
    res.json({
        message: "OK",
        data: {
            token,
            user
        }
    })
})

exports.forgotPassword = catchAsync(async (req, res, next) => {

})

exports.changePassword = catchAsync(async (req, res, next) => {

})
