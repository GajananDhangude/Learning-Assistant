const express = require("express");
const router  = express.Router();
const ChatHistoryModel = require("../models/ChatHistory.js");
const authMiddleware = require("../middleware/auth.middleware.js")
const  DocController  = require("../controllers/DocController.js")
const upload = require("../config/multer.js")


router.post("/upload" , authMiddleware , upload.single('file') , DocController.uploadDocument)
router.get("/" , getAllDocuments)
router.get("/:id" , getDocument)
router.delete("/:id" , deleteDocument)
router.put("/:id" , updateDocument)



module.exports = router