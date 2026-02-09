const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");


router.post("/register" , AuthController.RegisterUser);
router.post("/login" , AuthController.LoginUser);
router.get("/logout" , AuthController.LogoutUser)
router.get("/users/me" , authMiddleware , AuthController.getCurrentUser);


module.exports = router;