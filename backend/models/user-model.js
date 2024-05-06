const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const AppError = require("../utils/appError");
const chatSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        trim: true,
        minLength: 5,

    },
    passwordConfirm: {
        type: String,
        required: true,
        select: false,
        trim: true,

        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords are not the same"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    chats: [chatSchema]
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
//check if password is mddified and invalidate token

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})
const User = mongoose.model("User", userSchema);

module.exports = User
