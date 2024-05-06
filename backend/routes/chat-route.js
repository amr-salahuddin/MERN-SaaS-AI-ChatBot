const chatController  = require("../controllers/chat-controller");
const authController = require("../controllers/auth-controller");
const router = require("express").Router();

router.get("/", authController.protect, chatController.getChat);
router.post("/",authController.protect, chatController.chat);
router.delete("/",authController.protect, chatController.clearChat);


module.exports = router;
