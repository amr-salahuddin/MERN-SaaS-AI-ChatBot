const dotenv = require("dotenv");
dotenv.config({path: "./config/.env"});
const app = require('./app')
const mongoose = require("mongoose");
const chat = require("./utils/chat");

let url= process.env.MONGODB_URL;
url = url.replace("<PASSWORD>", process.env.MONGODB_PASSWORD);
mongoose.connect(url, {
}).then(
    () => {
        console.log("Database connected");

        app.listen(3000, () => {
            console.log("Listening on port 3000");
        })
    }
).catch((err) => console.log(err));

