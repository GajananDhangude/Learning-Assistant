const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.controller.js")


router.post("/register" , AuthController.RegisterUser);
router.post("/login" , AuthController.LoginUser);
router.get("/logout" , AuthController.LogoutUser)


module.exports = router;