const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/index-router");
const app = express();


if (process.env.NODE_ENV !== "production")
    app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1', router);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    console.log(error);
    res.status(status).json({
        message: message,
    })
})


module.exports = app
