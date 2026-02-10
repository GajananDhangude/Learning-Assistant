const express = require("express");
const DocumentModel = require("../models/Document.model.js");



async function uploadDocument(req , res) {
    try{
        if(!req.file){
            return res.status(400).json({error:"NO file uploaded"});

        }

        const document = new DocumentModel({
            userId:req.user._id,
            filename:req.file.filename,
            originalName:req.file.originalname,
            filesize:req.file.filesize

        })

        await document.save();


        res.json({
      message: 'Document uploaded successfully',
      document: {
        id: document._id,
        filename: document.originalname,
        status: document.status,
      }
    });
    } catch(error){
        console.log('upload err: ', error.message)
    }
}


module.exports = {
    uploadDocument
}