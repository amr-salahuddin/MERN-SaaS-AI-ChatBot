const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const chat = require("../utils/chat");


exports.chat = catchAsync(async (req, res, next) => {
    const user = req.user;
    const {message, max_tokens} = req.body;
    const chats = user.chats.map(
        ({role, content}) => {
        return {role, content}
    });
    const messages = [
        ...chats,
        {role: "user", content: message}
    ]
    //add new chat to user.chats
    user.chats.push({role: "user", content: message});
    await user.save();
    const queryData = {
        messages,
        max_tokens
    }
    const response = await chat(queryData);
    const responseMessage = response.reponseMessage;
    user.chats.push({role: "assistant", content: responseMessage});
    await user.save();
    console.log(responseMessage);
    res.json({
        message: "OK",
        data: {
            responseMessage
        }
    });
})


exports.clearChat = catchAsync(async (req, res, next) => {
    const user = req.user;
    user.chats = [];
    await user.save();
    res.json({
        message: "OK"
    })
})

exports.getChat = catchAsync(async (req, res, next) => {
    const user = req.user;
    res.json({
        message: "OK",
        data: user.chats
    })
})
