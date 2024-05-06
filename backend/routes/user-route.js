const router = require("express").Router();
const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");

router.get("/", userController.getAllUsers);
//
router.get("/:id", userController.getUser);


router.post("/login", authController.login);

router.post("/register", authController.register);
router.post("/checkAuth", authController.protect, authController.checkToken);


router.delete("/", userController.deleteAllUsers);
router.delete("/:id", userController.deleteUser);
module.exports = router;

