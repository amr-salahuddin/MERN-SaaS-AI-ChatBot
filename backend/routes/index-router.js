const router = require("express").Router();
const userRouter = require("./user-route");
const chatRouter = require("./chat-route");


router.use("/user", userRouter);
router.use("/user", userRouter);
router.use("/chat", chatRouter);


module.exports = router;
