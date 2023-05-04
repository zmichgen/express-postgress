const authcontroller = require("../controllers/users");
const userRouter = require("express").Router();

userRouter.route("/signup").post(authcontroller.signup);
userRouter.route("/login").post(authcontroller.login);

module.exports = userRouter;