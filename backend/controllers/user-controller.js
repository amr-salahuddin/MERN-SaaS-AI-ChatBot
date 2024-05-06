const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    res.json({
        message: "OK",
        users
    })
})

exports.getUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user)
        return next(new AppError("User not found", 404));
    res.json({
        message: "OK",
        user
    })
})


exports


exports.deleteAllUsers = catchAsync(async (req, res) => {
    await User.deleteMany();

    res.json({
        message: "OK"
    })
})

exports.deleteUser = catchAsync(async (req, res) => {
    const id = req.params.id;

    await User.findByIdAndDelete(id);

    res.json({
        message: "OK"
    })

})
